package com.natwest.learning.User.Service.ControllerTests;

import com.natwest.learning.User.Service.exception.UserAlreadyExistsException;
import com.natwest.learning.User.Service.exception.UserNotFoundException;
import com.natwest.learning.User.Service.model.User;
import com.natwest.learning.User.Service.service.UserService;
import com.natwest.learning.User.Service.controller.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserControllerTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUserSuccess() throws UserAlreadyExistsException {
        User user = new User();
        when(userService.registerUser(user)).thenReturn(user);
        ResponseEntity<?> responseEntity = userController.registerUser(user);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
    }

    @Test
    void testRegisterUserConflict() throws UserAlreadyExistsException {
        User user = new User();
        when(userService.registerUser(user)).thenThrow(new UserAlreadyExistsException("User already exists"));
        ResponseEntity<?> responseEntity = userController.registerUser(user);
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
    }

    @Test
    void testGetAllUsers() {
        List<User> users = new ArrayList<>();
        when(userService.getAllUsers()).thenReturn(users);
        ResponseEntity<?> responseEntity = userController.getAllUsers();
        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
    }

    @Test
    void testGetUserByIdSuccess() throws UserNotFoundException {
        User user = new User();
        Long userId = 1L;
        when(userService.getUserById(userId)).thenReturn(user);
        ResponseEntity<?> responseEntity = userController.getUserById(userId);
        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
    }

    @Test
    void testGetUserByIdNotFound() throws UserNotFoundException {
        Long userId = 1L;
        when(userService.getUserById(userId)).thenThrow(new UserNotFoundException("User not found"));
        ResponseEntity<?> responseEntity = userController.getUserById(userId);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testGetUserByEmailIdSuccess() throws UserNotFoundException {
        User user = new User();
        String emailId = "test@example.com";
        when(userService.getUserByEmailId(emailId)).thenReturn(user);
        ResponseEntity<?> responseEntity = userController.getUserByEmailId(emailId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    void testGetUserByEmailIdNotFound() throws UserNotFoundException {
        String emailId = "nonexistent@example.com";
        when(userService.getUserByEmailId(emailId)).thenThrow(new UserNotFoundException("User not found"));
        ResponseEntity<?> responseEntity = userController.getUserByEmailId(emailId);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testDeleteUserSuccess() throws UserNotFoundException {
        Long userId = 1L;
        when(userService.deleteUser(userId)).thenReturn(true);
        ResponseEntity<?> responseEntity = userController.deleteUser(userId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    void testDeleteUserNotFound() throws UserNotFoundException {
        Long userId = 1L;
        when(userService.deleteUser(userId)).thenThrow(new UserNotFoundException("User not found"));
        ResponseEntity<?> responseEntity = userController.deleteUser(userId);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testUpdateUserSuccess() throws UserNotFoundException {
        Long userId = 1L;
        User user = new User();
        when(userService.updateUser(userId, user)).thenReturn(user);
        ResponseEntity<?> responseEntity = userController.updateUser(userId, user);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    void testUpdateUserNotFound() throws UserNotFoundException {
        Long userId = 1L;
        User user = new User();
        when(userService.updateUser(userId, user)).thenThrow(new UserNotFoundException("User not found"));
        ResponseEntity<?> responseEntity = userController.updateUser(userId, user);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void testLoginSuccess() throws UserNotFoundException {
        User user = new User();
        String emailId = "test@example.com";
        user.setEmailId(emailId);
        when(userService.validate(user)).thenReturn(true);
        when(userService.getUserByEmailId(emailId)).thenReturn(user);
        HttpSession session = mock(HttpSession.class);
        ResponseEntity<?> responseEntity = userController.login(user, session);
        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
    }

    @Test
    void testLoginFailure() throws UserNotFoundException {
        User user = new User();
        when(userService.validate(user)).thenReturn(false);
        HttpSession session = mock(HttpSession.class);
        ResponseEntity<?> responseEntity = userController.login(user, session);
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
    }

    @Test
    void testLogoutSuccess() {
        HttpSession session = mock(HttpSession.class);
        when(session.getAttribute("emailId")).thenReturn("test@example.com");
        ResponseEntity<?> responseEntity = userController.logout(session);
        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
        verify(session, times(1)).invalidate();
    }

    @Test
    void testLogoutFailure() {
        HttpSession session = mock(HttpSession.class);
        when(session.getAttribute("emailId")).thenReturn(null);
        ResponseEntity<?> responseEntity = userController.logout(session);
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        verify(session, never()).invalidate();
    }
}