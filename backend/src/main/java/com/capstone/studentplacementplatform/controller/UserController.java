package com.capstone.studentplacementplatform.controller;

import com.capstone.studentplacementplatform.dto.LoginRequest;
import com.capstone.studentplacementplatform.model.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.studentplacementplatform.service.UserService;
import com.capstone.studentplacementplatform.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        // Check if username or email already exists
        if (userService.existsByUsername(registrationRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        if (userService.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        // Create user
        userService.registerUser(registrationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("User has been registered successfully");
    }

    @PostMapping("/auth")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // Retrieve user from the database by username
        Optional<User> userOptional = userService.findByUsername(loginRequest.getUsername());

        // Check if user exists and password matches
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String hashedPassword = user.getPassword(); // Retrieve hashed password from the user object
            if (passwordEncoder.matches(loginRequest.getPassword(), hashedPassword)) {
                // Authentication successful
                return ResponseEntity.ok("Login successful");
            }
        }

        // Authentication failed
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}