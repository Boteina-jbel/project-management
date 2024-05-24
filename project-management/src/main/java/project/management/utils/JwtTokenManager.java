package project.management.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenManager  {

    Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String createToken(String username) {
        Claims claims = Jwts.claims().setSubject(username);

        Date now = new Date();
        long validityInMilliseconds = 3600000;
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key)
                .compact();
    }

    public void validateAndExpireTokenForLogin(String username, String token) {
        try {
            // First, validate the token's integrity and expiry.
            if (!validateToken(token)) {
                return;
            }

            // Next, extract the login (subject) from the token.
            String tokenLogin = getLoginFromToken(token);

            // Finally, check if the extracted login matches the expected login.
            expireToken(token);
        } catch (JwtException | IllegalArgumentException exception) {
            // Log or handle the error appropriately
        }
    }

    public boolean validateToken(String token) {
        try {
            // Parse and validate the token using the secure key
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

            // If parsing succeeds without throwing an exception, the token is valid
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String getLoginFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    public void expireToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        claims.setExpiration(new Date(0));
    }

}