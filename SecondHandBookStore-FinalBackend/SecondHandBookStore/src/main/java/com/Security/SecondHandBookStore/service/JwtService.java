package com.Security.SecondHandBookStore.service;

import com.Security.SecondHandBookStore.entity.User;
import com.Security.SecondHandBookStore.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;


@Service
public class JwtService {
    @Autowired
    private UserRepository userRepository;
    private static final long TOKEN_VALIDITY = 24 * 60 * 60 * 1000; // 24 hours

    public boolean isValid(String token, User user) {
        new User();
        User user1 = userRepository.findByEmail(user.getEmail());
        String usernameToken = user1.getToken();
        return (usernameToken.equals(token) );
    }
    

    public String generateToken(User user) {
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
}






