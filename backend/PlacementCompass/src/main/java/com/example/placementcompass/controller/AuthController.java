package com.example.placementcompass.controller;

import com.example.placementcompass.model.User;
import com.example.placementcompass.repository.UserRepository;
import com.example.placementcompass.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthController(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Email already registered");
        }

        // Hash the password before saving it
        String hashedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(hashedPassword);

        User savedUser = userRepository.save(user);

        // Do not return the password to the frontend
        savedUser.setPassword(null);

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {

        User user = userRepository
                .findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body("Invalid email or password");
        }

        boolean passwordMatches;

        // Supports existing plain-text passwords temporarily
        if (user.getPassword().startsWith("$2a$")
                || user.getPassword().startsWith("$2b$")
                || user.getPassword().startsWith("$2y$")) {

            passwordMatches = passwordEncoder.matches(
                    loginUser.getPassword(),
                    user.getPassword()
            );

        } else {

            passwordMatches = user.getPassword()
                    .equals(loginUser.getPassword());

            // Upgrade an old plain-text password to BCrypt
            if (passwordMatches) {
                user.setPassword(
                        passwordEncoder.encode(
                                loginUser.getPassword()
                        )
                );

                userRepository.save(user);
            }
        }

        if (!passwordMatches) {
            return ResponseEntity.badRequest()
                    .body("Invalid email or password");
        }

        Map<String, Object> response = new HashMap<>();

        response.put("message", "Login successful");
        String token = jwtService.generateToken(user.getEmail());
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }
}