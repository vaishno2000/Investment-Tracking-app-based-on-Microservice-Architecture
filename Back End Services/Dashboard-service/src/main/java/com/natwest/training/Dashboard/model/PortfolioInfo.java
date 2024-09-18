package com.natwest.training.Dashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(collection = "portfolios")
public class PortfolioInfo {

    @Id
    private String userId; // User ID (unique for each user and primary key)
    private List<Portfolio> portfolios; // List of Portfolio objects associated with the user

    public PortfolioInfo(String userId, List<Portfolio> portfolios) {
        super();
        this.userId = userId;
        this.portfolios = portfolios;
    }
    public PortfolioInfo(){super();}


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Portfolio> getPortfolios() {
        return portfolios;
    }

    public void setPortfolios(List<Portfolio> portfolios) {
        this.portfolios = portfolios;
    }


}
