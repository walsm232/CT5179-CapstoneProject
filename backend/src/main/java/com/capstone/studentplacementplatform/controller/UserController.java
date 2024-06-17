package com.capstone.studentplacementplatform.controller;

import com.capstone.studentplacementplatform.dto.EducationHistoryRequest;
import com.capstone.studentplacementplatform.dto.LoginRequest;
import com.capstone.studentplacementplatform.dto.RegistrationRequest;
import com.capstone.studentplacementplatform.model.UserEducationHistory;
import com.capstone.studentplacementplatform.model.UserSkills;
import com.capstone.studentplacementplatform.model.User;
import com.capstone.studentplacementplatform.service.UserEducationHistoryService;
import com.capstone.studentplacementplatform.service.UserSkillService;
import com.capstone.studentplacementplatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@Validated
@RequestMapping("/api/v1/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserSkillService.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserEducationHistoryService educationHistoryService;

    @Autowired
    private UserSkillService skillService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        if (userService.existsByUsername(registrationRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Username already exists"));
        }

        if (userService.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Email already exists"));
        }

        User registeredUser = userService.registerUser(registrationRequest);

        String mockToken = "mock-token";

        Map<String, Object> response = Map.of(
                "userId", registeredUser.getId(),
                "username", registeredUser.getUsername(),
                "email", registeredUser.getEmail(),
                "message", "User has been registered successfully",
                "token", mockToken
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String hashedPassword = user.getPassword();
            if (passwordEncoder.matches(loginRequest.getPassword(), hashedPassword)) {
                return ResponseEntity.ok(Map.of("userId", user.getId(), "message", "Login successful"));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        users.forEach(user -> user.setPassword("REDACTED"));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword("REDACTED");
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @Valid @RequestBody User userDetails) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            User updatedUser = userService.save(user);
            updatedUser.setPassword("REDACTED");
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/skills/{id}")
    public ResponseEntity<?> getSkillById(@PathVariable Long userId, @PathVariable Long id) {
        Optional<UserSkills> skillOptional = skillService.findById(id);
        return skillOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{userId}/skills")
    public ResponseEntity<?> getSkillsByUserId(@PathVariable Long userId) {
        List<UserSkills> skills = skillService.findByUserId(userId);
        return ResponseEntity.ok(skills);
    }

    @PostMapping("/{userId}/skills")
    public ResponseEntity<?> addSkillForUser(@PathVariable Long userId, @RequestBody UserSkills skill) {
        UserSkills savedSkill = skillService.addSkillForUser(userId, skill);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSkill);
    }

    @PutMapping("/{userId}/skills/{id}")
    public ResponseEntity<?> updateSkill(@PathVariable Long userId, @PathVariable Long id, @RequestBody UserSkills skillDetails) {
        Optional<UserSkills> skillOptional = skillService.findById(id);
        if (skillOptional.isPresent()) {
            UserSkills skill = skillOptional.get();
            skill.setSkillName(skillDetails.getSkillName());
            UserSkills updatedSkill = skillService.save(skill);
            return ResponseEntity.ok(updatedSkill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/skills/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        skillService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/{userId}/education-history")
    public ResponseEntity<?> getEducationHistoryByUserId(@PathVariable Long userId) {
        List<UserEducationHistory> educationHistoryList = educationHistoryService.findByUserId(userId);
        return ResponseEntity.ok(educationHistoryList);
    }

    @GetMapping("/{userId}/education-history/{id}")
    public ResponseEntity<?> getEducationHistoryById(@PathVariable Long userId, @PathVariable Long id) {
        Optional<UserEducationHistory> educationHistoryOptional = educationHistoryService.findById(id);
        return educationHistoryOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}/education-history")
    public ResponseEntity<?> addEducationHistory(@RequestBody EducationHistoryRequest request) {
        UserEducationHistory educationHistory = educationHistoryService.saveEducationHistory(request.getUserId(), request.getInstitutionName(), request.getDegree(), request.getMajor(), request.getStartDate(), request.getEndDate());
        return ResponseEntity.status(HttpStatus.CREATED).body(educationHistory);
    }

    @PutMapping("/{userId}/education-history/{id}")
    public ResponseEntity<?> updateEducationHistory(@PathVariable Long id, @RequestBody UserEducationHistory educationHistoryDetails) {
        Optional<UserEducationHistory> educationHistoryOptional = educationHistoryService.findById(id);
        if (educationHistoryOptional.isPresent()) {
            UserEducationHistory educationHistory = educationHistoryOptional.get();
            educationHistory.setInstitutionName(educationHistoryDetails.getInstitutionName());
            educationHistory.setDegree(educationHistoryDetails.getDegree());
            educationHistory.setMajor(educationHistoryDetails.getMajor());
            educationHistory.setStartDate(educationHistoryDetails.getStartDate());
            educationHistory.setEndDate(educationHistoryDetails.getEndDate());
            UserEducationHistory updatedEducationHistory = educationHistoryService.save(educationHistory);
            return ResponseEntity.ok(updatedEducationHistory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/education-history/{id}")
    public ResponseEntity<?> deleteEducationHistory(@PathVariable Long id) {
        educationHistoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
