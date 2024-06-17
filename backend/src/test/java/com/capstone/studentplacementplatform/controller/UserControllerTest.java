package com.capstone.studentplacementplatform.controller;

import com.capstone.studentplacementplatform.dto.RegistrationRequest;
import com.capstone.studentplacementplatform.model.User;
import com.capstone.studentplacementplatform.service.UserService;
import com.capstone.studentplacementplatform.service.UserSkillService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Mock
    private UserSkillService skillService;

    @Test
    public void testGetUserById_Success() {
        User mockUser = new User("John", "Doe", "johndoe123", "johndoe@gmail.com", "password123", "Student");
        when(userService.findById(1L)).thenReturn(java.util.Optional.of(mockUser));

        ResponseEntity<?> response = userController.getUserById(1L);

        assertEquals(HttpStatus.OK.value(), response.getStatusCode().value());
        assertEquals(mockUser, response.getBody());
    }

    @Test
    public void testRegisterUser_Success() {
        RegistrationRequest registrationRequest = new RegistrationRequest("John", "Doe", "johndoe123", "johndoe@gmail.com", "password123");

        User user = new User();
        user.setId(1L);
        user.setUsername("johndoe123");
        user.setEmail("johndoe@gmail.com");

        when(userService.existsByUsername("johndoe123")).thenReturn(false);
        when(userService.existsByEmail("johndoe@gmail.com")).thenReturn(false);
        when(userService.registerUser(registrationRequest)).thenReturn(user);

        ResponseEntity<?> response = userController.registerUser(registrationRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        @SuppressWarnings("unchecked")
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assert responseBody != null;
        assertEquals(1L, responseBody.get("userId"));
        assertEquals("johndoe123", responseBody.get("username"));
        assertEquals("johndoe@gmail.com", responseBody.get("email"));
        assertEquals("User has been registered successfully", responseBody.get("message"));
        assertEquals("mock-token", responseBody.get("token"));
    }

    @Test
    public void testDeleteSkill_Success() {
        Long skillId = 1L;

        doNothing().when(skillService).deleteById(skillId);
        ResponseEntity<?> response = userController.deleteSkill(skillId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }


}
