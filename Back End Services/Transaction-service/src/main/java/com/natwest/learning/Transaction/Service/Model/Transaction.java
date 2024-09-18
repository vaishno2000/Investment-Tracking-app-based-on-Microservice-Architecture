package com.natwest.learning.Transaction.Service.Model;

import com.fasterxml.uuid.Generators;
import com.fasterxml.uuid.NoArgGenerator;
import org.springframework.data.annotation.Id;

import java.util.Date;

public class Transaction {
    @Id
    private String transactionID;
    private String symbol;
    private String stockName;
    private int quantity;
    private double priceOfStock;
    private Date dateOfPurchase;
    private String transactionType;

    public Transaction(String transactionID, String symbol, String stockName, int quantity, double priceOfStock, Date dateOfPurchase, String transactionType) {
        NoArgGenerator generator = Generators.timeBasedGenerator();

        this.transactionID = generator.generate().toString();;
        this.symbol = symbol;
        this.stockName = stockName;
        this.quantity = quantity;
        this.priceOfStock = priceOfStock;
        this.dateOfPurchase = dateOfPurchase;
        this.transactionType=transactionType;
    }

    public Transaction() {
        NoArgGenerator generator = Generators.timeBasedGenerator();

        this.transactionID = generator.generate().toString();
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
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

    public double getpriceOfStock() {
        return priceOfStock;
    }

    public void setpriceOfStock(double priceOfStock) {
        this.priceOfStock = priceOfStock;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = new Date();
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }
}
