package com.natwest.project.addremovestock.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class UserPortfolioInfo {
    @Id
    private UserPortfolioIdentity userPortfolioIdentity;
    private List<Stock> stockList;

    public UserPortfolioInfo() {
    }

    public UserPortfolioInfo(UserPortfolioIdentity userPortfolioIdentity, List<Stock> stockList) {
        this.userPortfolioIdentity = userPortfolioIdentity;
        this.stockList = stockList;
    }

    public UserPortfolioIdentity getUserPortfolioIdentity() {
        return userPortfolioIdentity;
    }

    public void setUserPortfolioIdentity(UserPortfolioIdentity userPortfolioIdentity) {
        this.userPortfolioIdentity = userPortfolioIdentity;
    }

    public List<Stock> getStockList() {
        return stockList;
    }

    public void setStockList(List<Stock> stockList) {
        this.stockList = stockList;
    }

    @Override
    public String toString() {
        return "UserPortfolioInfo{" +
                "userPortfolioIdentity=" + userPortfolioIdentity +
                ", stockList=" + stockList +
                '}';
    }
}
