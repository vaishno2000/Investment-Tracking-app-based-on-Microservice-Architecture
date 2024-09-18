package com.natwest.learning.User.Service.serviceTests;

import com.natwest.learning.User.Service.exception.UserAlreadyExistsException;
import com.natwest.learning.User.Service.exception.UserNotFoundException;
import com.natwest.learning.User.Service.model.User;
import com.natwest.learning.User.Service.repository.UserRepository;
import com.natwest.learning.User.Service.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceImplTests {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void testGetUserById() throws UserNotFoundException {
        // Arrange
        User user = new User();
        user.setUserId(1L);
        when(repository.findById(1L)).thenReturn(java.util.Optional.of(user));

        // Act
        User fetchedUser = userService.getUserById(1L);

        // Assert
        assertNotNull(fetchedUser);
        assertEquals(1L, fetchedUser.getUserId());
    }

    @Test
    void testDeleteUser() throws UserNotFoundException {
        // Arrange
        User user = new User();
        user.setUserId(1L);
        when(repository.findById(1L)).thenReturn(java.util.Optional.of(user));
        Mockito.doNothing().when(repository).delete(user);

        // Act
        boolean status = userService.deleteUser(1L);

        // Assert
        assertTrue(status);
        verify(repository, times(1)).delete(user);
    }


    @Test
    void testRegisterUser_Success() throws UserAlreadyExistsException {
        // Arrange
        User user = new User();
        user.setEmailId("test@example.com");
        when(repository.save(user)).thenReturn(user);

        // Act
        User savedUser = userService.registerUser(user);

        // Assert
        assertNotNull(savedUser);
        assertEquals("test@example.com", savedUser.getEmailId());
    }

    @Test
    void testGetAllUsers() {
        // Arrange
        when(repository.findAll()).thenReturn(List.of(new User(), new User()));

        // Act
        List<User> users = userService.getAllUsers();

        // Assert
        assertNotNull(users);
        assertEquals(2, users.size());
    }

    @Test
    void testUpdateUser_Success() throws UserNotFoundException {
        // Arrange
        User existingUser = new User();
        existingUser.setUserId(1L);
        existingUser.setEmailId("old@example.com");

        User updatedUser = new User();
        updatedUser.setEmailId("new@example.com");

        when(repository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(repository.save(existingUser)).thenReturn(existingUser);

        // Act
        User result = userService.updateUser(1L, updatedUser);

        // Assert
        assertNotNull(result);
        assertEquals("new@example.com", result.getEmailId());
    }

    @Test
    void testUpdateUser_UserNotFound() {
        // Arrange
        when(repository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> userService.updateUser(1L, new User()));
    }

    @Test
    void testDeleteUser_Success() throws UserNotFoundException {
        // Arrange
        User existingUser = new User();
        existingUser.setUserId(1L);

        when(repository.findById(1L)).thenReturn(Optional.of(existingUser));

        // Act
        boolean result = userService.deleteUser(1L);

        // Assert
        assertTrue(result);
    }

    @Test
    void testDeleteUser_UserNotFound() {
        // Arrange
        Long userId = 2L;
        when(repository.findById(userId)).thenReturn(Optional.empty()); // Simulate user not found in the repository

        // Act and Assert
        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            userService.deleteUser(userId);
        });

        // Assert
        assertEquals("User doesn't exist", exception.getMessage());
        verify(repository, times(1)).findById(userId);
        verify(repository, Mockito.never()).delete(any(User.class));
    }

    @Test
    void testGetUserById_Success() throws UserNotFoundException {
        // Arrange
        User existingUser = new User();
        existingUser.setUserId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(existingUser));

        // Act
        User result = userService.getUserById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getUserId());
    }

    @Test
    void testGetUserById_UserNotFound() {
        // Arrange
        when(repository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(1L));
    }

    @Test
    void testGetUserByEmailId_UserFound() throws UserNotFoundException {
        // Arrange
        User existingUser = new User();
        existingUser.setEmailId("test@example.com");
        when(repository.findByEmailId("test@example.com")).thenReturn(existingUser);

        // Act
        User result = userService.getUserByEmailId("test@example.com");

        // Assert
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmailId());
    }

    @Test
    void testGetUserByEmailId_UserNotFound() throws UserNotFoundException {
        // Arrange
        when(repository.findByEmailId("nonexistent@example.com")).thenReturn(null);

        // Act
        User result = userService.getUserByEmailId("nonexistent@example.com");

        // Assert
        assertNull(result);
    }
    @Test
    void testValidate_ValidUser() {
        // Arrange
        String userEmail = "test@example.com";
        String userPassword = "password123";

        User mockUser = new User();
        mockUser.setEmailId(userEmail);
        mockUser.setPassword(userPassword);

        when(repository.findByEmailId(userEmail)).thenReturn(mockUser);

        UserServiceImpl userService = new UserServiceImpl(repository);

        // Act
        boolean isValid = userService.validate(mockUser);

        // Assert
        assertTrue(isValid);
        verify(repository, times(1)).findByEmailId(userEmail);
    }


    @Test
    void testValidate_UserNotFound() {
        // Arrange
        String userEmail = "nonexistent@example.com";

        when(repository.findByEmailId(userEmail)).thenReturn(null);

        UserServiceImpl userService = new UserServiceImpl(repository);

        // Act
        boolean isValid = userService.validate(new User(userEmail, "password123"));

        // Assert
        assertFalse(isValid);
        verify(repository, times(1)).findByEmailId(userEmail);
    }
}