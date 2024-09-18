package com.natwest.learning.User.Service.controller;

import com.natwest.learning.User.Service.exception.UserAlreadyExistsException;
import com.natwest.learning.User.Service.exception.UserNotFoundException;
import com.natwest.learning.User.Service.model.User;
import com.natwest.learning.User.Service.model.UserIdWithToken;
import com.natwest.learning.User.Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserService service;
    String jwtToken;
    public UserController(UserService service) {
        this.service = service;
    }
    @RequestMapping(value = "/users", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptionsRequest() {
        return ResponseEntity.ok()
                .allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE)
                .build();
    }

    // Add the user
    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try{
            User registerUser=service.registerUser(user);
            return new ResponseEntity<User>(registerUser, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }
    @GetMapping
    public ResponseEntity<?>getAllUsers(){
        List<User>users=service.getAllUsers();
        return new ResponseEntity<List<User>>(users,HttpStatus.ACCEPTED);
    }
    // Get User by ID
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId){
        try{
            if(userId==null){
                return new ResponseEntity<>("ID must not be null!", HttpStatus.BAD_REQUEST);
            }
            User fetchedUser=service.getUserById(userId);
            return new ResponseEntity<User>(fetchedUser, HttpStatus.ACCEPTED);
        }  catch (UserNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    //Get User by EmailId
    @GetMapping("/email/{emailId}")
    public ResponseEntity<?> getUserByEmailId(@PathVariable String emailId) {
        try {
            User fetchedUser = service.getUserByEmailId(emailId);
            return new ResponseEntity<User>(fetchedUser, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Delete the User
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        try{
            boolean fetchedUser=service.deleteUser(userId);
            return new ResponseEntity<String>("User Deleted Successfuly", HttpStatus.OK);
        }  catch (UserNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId,@RequestBody User updateUser){
        try{
            User updatedUser=service.updateUser(userId,updateUser);
            return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
        }  catch (UserNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpSession session) throws UserNotFoundException {
        boolean flag=service.validate(user);
        if(flag){
            session.setAttribute("emailId",user.getEmailId());
            jwtToken=generateToken(user.getEmailId());
            UserIdWithToken result=new UserIdWithToken(service.getUserByEmailId(user.getEmailId()).getUserId(),jwtToken);
            return  new ResponseEntity<UserIdWithToken>(result,HttpStatus.ACCEPTED);
        }else{
            return  new ResponseEntity<String>("Failure",HttpStatus.CONFLICT);
        }
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        if((session !=null) && session.getAttribute("emailId") !=null){
            session.invalidate(); // Destroying the Session Object
            return  new ResponseEntity<String>("Logged Out Successfuly",HttpStatus.ACCEPTED);
        }else{
            return  new ResponseEntity<String>("Failure",HttpStatus.CONFLICT);
        }
    }
    public String generateToken(String emailId){
        String token= Jwts.builder()
                .setSubject(String.valueOf(emailId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+300000))
                .signWith(SignatureAlgorithm.HS256, "secretKey")
                .compact();
        System.out.println("Token "+token);
        return token;
    }
}