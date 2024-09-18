package com.natwest.learning.User.Service.model;

public class UserIdWithToken {
    private Long userId;
    private String token;

    public UserIdWithToken(Long userId, String token) {
        this.userId = userId;
        this.token = token;
    }

    public UserIdWithToken() {
    }

    public Long getUser() {
        return userId;
    }

    public void setUser(Long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


// Constructors, getters, and setters
}