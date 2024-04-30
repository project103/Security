package com.Security.SecondHandBookStore.service;

import com.Security.SecondHandBookStore.entity.User;
import com.Security.SecondHandBookStore.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;


@Service
public class JwtService {
    @Autowired
    private UserRepository userRepository;
    private static final long TOKEN_VALIDITY = 24 * 60 * 60 * 1000; // 24 hours
    
    private   SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);



    public boolean isValid(String token, UserDetails user) {
        new User();
        User user1 = userRepository.findByEmail(user.getUsername());
        String usernameToken = user1.getToken();
        return (usernameToken.equals(token) && !isTokenExpired(token));
    }
    

    public String generateToken(User user) {
        // Generate a secure key for HMAC-SHA256 algorithm
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                .signWith(key) // Sign the token with the key
                .compact();

        user.setToken(token);
        userRepository.save(user);
        return token;
    }
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Key.getBytes());
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    // Other methods...
}





}
