package com.natwest.learning.User.Service.service;


import com.natwest.learning.User.Service.exception.UserAlreadyExistsException;
import com.natwest.learning.User.Service.exception.UserNotFoundException;
import com.natwest.learning.User.Service.model.User;

import java.util.List;

public interface UserService {
    public User registerUser(User user) throws UserAlreadyExistsException;
    public User updateUser(Long userId, User user) throws UserNotFoundException;
    public boolean deleteUser(Long userId) throws UserNotFoundException;
    public User getUserById(Long userId) throws UserNotFoundException;
    public boolean validate(User user);
    public User getUserByEmailId(String emailId) throws UserNotFoundException;

    List<User> getAllUsers();
}
