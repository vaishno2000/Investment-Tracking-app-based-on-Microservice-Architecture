package com.natwest.project.addremovestock.model;

import org.springframework.data.annotation.Id;

import java.util.Date;

public class Stock {
    private String symbol;
    private String stockName;
    private int quantity;
    private double priceOfPurchase;
    private Date dateOfPurchase;

    public Stock() {
    }

    public Stock(String symbol, String stockName, int quantity, double priceOfPurchase, Date dateOfPurchase) {
        this.symbol = symbol;
        this.stockName = stockName;
        this.quantity = quantity;
        this.priceOfPurchase = priceOfPurchase;
        this.dateOfPurchase = new Date();
    }

    public Stock(String symbol, String stockName, int quantity, double priceOfPurchase) {
        this.symbol = symbol;
        this.stockName = stockName;
        this.quantity = quantity;
        this.priceOfPurchase = priceOfPurchase;
        this.dateOfPurchase = new Date();
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPriceOfPurchase() {
        return priceOfPurchase;
    }

    public void setPriceOfPurchase(double priceOfPurchase) {
        this.priceOfPurchase = priceOfPurchase;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = new Date();
    }

    @Override
    public String toString() {
        return "Stock{" +
                ", symbol='" + symbol + '\'' +
                ", stockName='" + stockName + '\'' +
                ", quantity=" + quantity +
                ", priceOfPurchase=" + priceOfPurchase +
                ", dateOfPurchase=" + dateOfPurchase +
                '}';
    }
}
