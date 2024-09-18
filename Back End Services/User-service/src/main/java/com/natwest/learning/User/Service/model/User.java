package com.natwest.learning.User.Service.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "UserTable")
public class User {
    @Id
    @GeneratedValue
    private Long userId;
    private String firstName;
    private String lastName;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateOfBirth;
    @Column(unique = true)
    private String emailId;
    private String mobileNumber;
    private String password;
    private String confirmPassword;
    private Boolean agreedToTerms;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date userAddedDate;

    public User() {
    }

    public User(String firstName, String lastName, Date dateOfBirth, String emailId, String mobileNumber, String password, String confirmPassword,Boolean agreedToTerms, Date userAddedDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.agreedToTerms=agreedToTerms;
        this.dateOfBirth = dateOfBirth;
        this.emailId = emailId;
        this.mobileNumber=mobileNumber;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.userAddedDate = userAddedDate;
    }

    public User(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public Boolean getAgreedToTerms() {
        return agreedToTerms;
    }

    public void setAgreedToTerms(Boolean agreedToTerms) {
        this.agreedToTerms = agreedToTerms;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Date getUserAddedDate() {
        return userAddedDate;
    }

    public void setUserAddedDate(Date userAddedDate) {
        this.userAddedDate = userAddedDate;
    }
}
