package com.natwest.training.Dashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.NoArgGenerator;

@Document(collection = "Portfolio")
public class Portfolio {
    @Id
    private String portfolioId;
    private String portfolioName;
    private String investmentType;
    private String description;

    public Portfolio() {
        super();
        NoArgGenerator generator = Generators.timeBasedGenerator();
        this.portfolioId = generator.generate().toString();
    }

    public Portfolio(String portfolioId, String portfolioName, String investmentType, String description) {
        super();
        NoArgGenerator generator = Generators.timeBasedGenerator();
        this.portfolioId = generator.generate().toString();
        this.portfolioName = portfolioName;
        this.investmentType = investmentType;
        this.description = description;
    }

    public String getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(String portfolioId) {
        this.portfolioId = portfolioId;
    }

    public String getPortfolioName() {
        return portfolioName;
    }

    public void setPortfolioName(String portfolioName) {
        this.portfolioName = portfolioName;
    }

    public String getInvestmentType() {
        return investmentType;
    }

    public void setInvestmentType(String investmentType) {
        this.investmentType = investmentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
