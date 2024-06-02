package project.management.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import project.management.dto.Filter;
import project.management.dto.UserRequestDto;
import project.management.dto.UserResponseDto;
import project.management.entities.ProfileEndpoint;
import project.management.entities.User;
import project.management.repositories.ProfileEndpointRepository;
import project.management.repositories.UserRepository;
import project.management.utils.ErrorCode;
import project.management.utils.JwtTokenManager;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.management.utils.ProjectManagementException;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private JwtTokenManager jwtTokenManager;
    private ModelMapper modelMapper;
    private ProfileEndpointRepository profileEndpointRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, JwtTokenManager jwtTokenManager, ProfileEndpointRepository profileEndpointRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.jwtTokenManager = jwtTokenManager;
        this.profileEndpointRepository = profileEndpointRepository;
    }


    @Override
    public UserResponseDto save(UserRequestDto userRequestDto) {
        User user = modelMapper.map(userRequestDto,User.class);
        String username = generateUsername(user.getFirstName(), user.getLastName());
        user.setUsername(username);
        user.setPassword(generateRandomString());
        User saved = userRepository.save(user);
        return modelMapper.map(saved,UserResponseDto.class);
    }

    @Override
    public UserResponseDto authenticate(UserRequestDto userRequestDto){
        // Retrieve the user from DB
        User user = userRepository.findByUsername(userRequestDto.getUsername());

        // First check if the user exists and match the password from FE
        if (user == null) throw new RuntimeException("Login or Password invalid");
        if(! userRequestDto.getPassword().equals(user.getPassword())) throw new RuntimeException("Login or Password invalid");
        
        // Generate token
        String token = jwtTokenManager.createToken(user.getUsername());

        // Mapping to DTO and set the generated token
        UserResponseDto userResponseDto = modelMapper.map(user, UserResponseDto.class);
        userResponseDto.setToken(token);

        List<ProfileEndpoint> profileEndpoints = profileEndpointRepository.findByProfile(user.getProfile());
        userResponseDto.setProfileEndpoints(profileEndpoints);

        return userResponseDto;
    }

    @Override
    public void burnToken(UserRequestDto userRequestDto) {
        User user = userRepository.findByUsername(userRequestDto.getUsername());
        if (user == null) throw new ProjectManagementException(ErrorCode.security_login_password, "Login or Password invalid");

        jwtTokenManager.validateAndExpireTokenForLogin(userRequestDto.getUsername(), userRequestDto.getToken());
    }

    @Override
    public UserResponseDto findById(Long id) {
        User user =userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        return modelMapper.map(user,UserResponseDto.class);
    }

    @Override
    public UserResponseDto findByUsername(String username) {
        User user =userRepository.findByUsername(username);
        return modelMapper.map(user,UserResponseDto.class);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserResponseDto update(UserRequestDto userRequestDto, Long id) {
        Optional<User> userOptional =userRepository.findById(id);
        if (userOptional.isPresent()){
            User user=modelMapper.map(userRequestDto, User.class);
            user.setId(id);
            User updated= userRepository.save(user);
            return modelMapper.map(updated,UserResponseDto.class);
        }else {
            throw new EntityNotFoundException("User not found");
        }
    }

    @Override
    public List<UserResponseDto> findAll() {
        return userRepository.findAll()
                .stream().map(el->modelMapper.map(el, UserResponseDto.class))
                .collect(Collectors.toList());
    }

    protected String generateUsername(String firstName, String lastName){
        String[] firstNameParts = firstName.toLowerCase().split(" ");
        String[] lastNameParts = lastName.toLowerCase().split(" ");

        StringBuilder usernameBuilder = new StringBuilder();
        for (String part : firstNameParts) {
            usernameBuilder.append(part).append(".");
        }
        for (String part : lastNameParts) {
            usernameBuilder.append(part).append(".");
        }

        if (usernameBuilder.length() > 0) {
            usernameBuilder.deleteCharAt(usernameBuilder.length() - 1);
        }

        // Check if this combination firstName and lastName already exists
        String username = usernameBuilder.toString();
        List<User> persons = userRepository.findByUsernameContaining(username);
        if(persons.size() > 0) username += "."+ persons.size();

        return username;
    }

    public static String generateRandomString() {
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int LENGTH = 20;
        Random RANDOM = new SecureRandom();

        StringBuilder sb = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }
        return sb.toString();
    }

    public Page<UserResponseDto> findAll(Filter filter) {
        Pageable pageable   = constructPageable(filter);
        return userRepository.findByFilter(filter.getUsername(), filter.getFirstName(), filter.getLastName(), filter.getProfileCode(), pageable);
    }

    protected Pageable constructPageable(Filter filter) {
        if(filter == null) throw new ProjectManagementException(ErrorCode.filter_null, "Filter can't be null");
        int pageNumber      = filter.getPage() != null      ? filter.getPage() : 0;
        int pageSize        = filter.getPageSize() != null  ? filter.getPageSize() : 10;

        Sort.Direction sortDirection = Sort.Direction.DESC;
        if(Sort.Direction.ASC.name().equals(filter.getSortDirection())) sortDirection = Sort.Direction.ASC;

        Sort sort           = Sort.by(sortDirection, filter.getSortBy() != null ? filter.getSortBy() : "id");
        Pageable pageable   = PageRequest.of(pageNumber, pageSize, sort);

        return pageable;
    }

}
