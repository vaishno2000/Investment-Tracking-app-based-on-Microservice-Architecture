package com.natwest.learning.Transaction.Service.Model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class TransactionInfo {
    @Id
    private String userID;
    private List<Transaction> transactionList;

    public TransactionInfo() {
    }

    public TransactionInfo(String userID, List<Transaction> transactionList) {
        this.userID = userID;
        this.transactionList = transactionList;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public List<Transaction> getTransactionList() {
        return transactionList;
    }

    public void setTransactionList(List<Transaction> transactionList) {
        this.transactionList = transactionList;
    }
}
