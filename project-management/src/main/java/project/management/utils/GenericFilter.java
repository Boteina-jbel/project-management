package project.management.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import project.management.entities.Endpoint;
import project.management.entities.User;
import project.management.repositories.EndpointRepository;
import project.management.repositories.UserRepository;
import project.management.services.OpeningHoursService;
import project.management.services.ProfileEndpointService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GenericFilter implements Filter {

    protected Logger logger = LoggerFactory.getLogger(getClass());

    private final PayloadLogger payloadLogger;
    private final JwtTokenManager jwtTokenManager;
    private final UserRepository userRepository;
    private final OpeningHoursService openingHoursService;
    private final EndpointRepository endpointRepository;
    private final ProfileEndpointService profileEndpointService;

    @Autowired
    public GenericFilter(PayloadLogger payloadLogger, JwtTokenManager jwtTokenManager, UserRepository userRepository, OpeningHoursService openingHoursService, EndpointRepository endpointRepository, ProfileEndpointService profileEndpointService) {
        this.payloadLogger      = payloadLogger;
        this.jwtTokenManager    = jwtTokenManager;
        this.userRepository     = userRepository;
        this.openingHoursService = openingHoursService;
        this.endpointRepository = endpointRepository;
        this.profileEndpointService = profileEndpointService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String origin = httpRequest.getHeader("Origin");
        httpResponse.setHeader("Access-Control-Allow-Origin", origin);
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Allow-Methods", "*");
        httpResponse.setHeader("Access-Control-Allow-Headers", "*");

        String method = httpRequest.getMethod();
        if ("OPTIONS".equalsIgnoreCase(method)) {
            chain.doFilter(request, response);
            return;
        }

        ObjectMapper objectMapper = new ObjectMapper();

        // Continue with the filter chain
        try {

            String requestURI           = httpRequest.getRequestURI();
            String contextPath          = httpRequest.getContextPath();
            String uriWithoutContext    = requestURI.substring(contextPath.length());

            List<String> publicEndpoints        = Arrays.asList("/security/login");
            String username                     = null;
            String token                        = null;

            if (! publicEndpoints.contains(uriWithoutContext)) {

                username = httpRequest.getHeader("username");
                token    = httpRequest.getHeader("Authorization");
                if (token != null && token.startsWith("Bearer ")) {
                    token = token.substring("Bearer ".length());
                }

                // Log request
                logger.info("Incoming request -> Method: {}, URI: {}, username: {}",
                        httpRequest.getMethod(),  httpRequest.getRequestURI(), username);

                // Validate the token using TokenValidator
                boolean isValidToken = jwtTokenManager.validateTokenForUsername(token, username);

                if (!isValidToken) {
                    // Token is invalid, return unauthorized status
                    throw new ProjectManagementException(ErrorCode.unauthorized, "You are not authorized. Please login.");
                }

                Endpoint endpoint   = getEndpoint(httpRequest.getMethod(), uriWithoutContext);
                User user           = userRepository.findByUsername(username);

                // Check if the Person have the permission to use this endpoint
                profileEndpointService.checkProfileEndpointGranted(user.getProfile(), endpoint);

                openingHoursService.checkOpeningHoursAccess(user);
            }

            chain.doFilter(request, response);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            httpResponse.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            String errorCode    = null;
            String errorMessage = null;

            Throwable cause = throwable;
            while (cause != null && !(cause instanceof ProjectManagementException)) {
                cause = cause.getCause();
            }

            if (cause instanceof ProjectManagementException projectManagementException) {
                errorCode = projectManagementException.getErrorCode().name();
                errorMessage = projectManagementException.getMessage();
            } else {
                errorCode = ErrorCode.Declined.name();
                errorMessage = "An error occurred while processing the request";
            }

            // Write error message to the response body
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("errorCode", errorCode);
            errorResponse.put("errorMessage", errorMessage);
            errorResponse.put("status", String.valueOf(HttpServletResponse.SC_INTERNAL_SERVER_ERROR));

            httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            PrintWriter writer = httpResponse.getWriter();
            objectMapper.writeValue(writer, errorResponse);
            writer.flush();
            writer.close();
        }

        // Log response
        logger.info("Outgoing response - Status: {}", httpResponse.getStatus());
    }

    private Endpoint getEndpoint(String method, String uriWithoutContext) {
        // Get all endpoints
        List<Endpoint> endpoints = endpointRepository.findAll();

        // Find the endpoint that matches the method and the URI pattern
        for (Endpoint endpoint : endpoints) {
            if (endpoint.getMethod().equalsIgnoreCase(method) && pathMatches(endpoint.getValue(), uriWithoutContext)) {
                return endpoint;
            }
        }

        throw new ProjectManagementException(ErrorCode.endpoint_not_configured, "Endpoint " + uriWithoutContext + " not configured");
    }

    private boolean pathMatches(String pattern, String path) {
        // Convert the pattern to a regular expression
        String regex = pattern.replace("*", ".*");
        return path.matches(regex);
    }
}
