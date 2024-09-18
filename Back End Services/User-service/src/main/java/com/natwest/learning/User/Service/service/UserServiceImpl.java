package com.natwest.learning.User.Service.service;

import com.natwest.learning.User.Service.exception.UserAlreadyExistsException;
import com.natwest.learning.User.Service.exception.UserNotFoundException;
import com.natwest.learning.User.Service.model.User;
import com.natwest.learning.User.Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository=repository;
    }
    // Add the user
    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {
        User savedUser=null;
        user.setUserAddedDate(new Date());
        savedUser=repository.save(user);
        return savedUser;
    }
    @Override
    public List<User> getAllUsers(){
        return repository.findAll();
    }
    // update the user
    @Override
    public User updateUser(Long userId, User user) throws UserNotFoundException {
        try{
            User fetchedUser=repository.findById(userId).get();
            fetchedUser.setFirstName(user.getFirstName());
            fetchedUser.setLastName(user.getLastName());
            fetchedUser.setDateOfBirth(user.getDateOfBirth());
            fetchedUser.setEmailId(user.getEmailId());
            fetchedUser.setMobileNumber(user.getMobileNumber());
            fetchedUser.setPassword(user.getPassword());
            fetchedUser.setConfirmPassword(user.getConfirmPassword());
            fetchedUser.setAgreedToTerms(user.getAgreedToTerms());
            repository.save(fetchedUser);
            return fetchedUser;
        }catch (NoSuchElementException e){
            throw new UserNotFoundException("User doesn't exist");
        }
    }

    @Override
    public boolean deleteUser(Long userId) throws UserNotFoundException {
        boolean status=false;
        try{
            User fetchedUser=repository.findById(userId).get();
            repository.delete(fetchedUser);
            status=true;
        }catch (NoSuchElementException e){
            throw new UserNotFoundException("User doesn't exist");
        }
        return status;
    }

    @Override
    public User getUserById(Long userId) throws UserNotFoundException {
        Optional<User> fetchedUser = repository.findById(userId);
        if (fetchedUser.isPresent()) {
            return fetchedUser.get();
        } else {
            throw new UserNotFoundException("User doesn't exist");
        }
    }



    @Override
    public User getUserByEmailId(String emailId) throws UserNotFoundException {
        Optional<User> fetchedUser = Optional.ofNullable(repository.findByEmailId(emailId));
        if (fetchedUser.isPresent()) {
            return fetchedUser.get();
        } else {
            throw new UserNotFoundException("User doesn't exist");
        }
    }
    @Override
    public boolean validate(User user) {
        // Retrieve user from the database based on the provided email
        User existingUser = repository.findByEmailId(user.getEmailId());

        // Check if the user exists and the password matches
        // User is valid
        return existingUser != null && existingUser.getPassword().equals(user.getPassword());

        // User is not valid
    }
}