package com.natwest.project.addremovestock.model;

public class UserPortfolioIdentity {
    private String userId;
    private String portfolioId;

    public UserPortfolioIdentity() {
    }

    public UserPortfolioIdentity(String userId, String portfolioId) {
        this.userId = userId;
        this.portfolioId = portfolioId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(String portfolioId) {
        this.portfolioId = portfolioId;
    }

    @Override
    public String toString() {
        return "UserPortfolioIdentity{" +
                "userId='" + userId + '\'' +
                ", portfolioId='" + portfolioId + '\'' +
                '}';
    }
}
