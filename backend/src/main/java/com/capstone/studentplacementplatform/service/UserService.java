package com.capstone.studentplacementplatform.service;

import com.capstone.studentplacementplatform.model.User;
import com.capstone.studentplacementplatform.repository.UserRepository;
import com.capstone.studentplacementplatform.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public void registerUser(RegistrationRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        userRepository.save(user);
    }
}