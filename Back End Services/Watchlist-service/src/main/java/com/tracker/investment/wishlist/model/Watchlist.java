package com.tracker.investment.wishlist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Watchlist {

    @Id
    private String userID;
    private List<Stock> stockList;

    public Watchlist() {
        super();
    }

    public Watchlist(String userID, List<Stock> stockList) {
        super();
        this.userID = userID;
        this.stockList = stockList;
    }

    public String getUserID() {
        return userID;
    }

    public List<Stock> getStockList() {
        return stockList;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setStockList(List<Stock> stockList) {
        this.stockList = stockList;
    }
}
