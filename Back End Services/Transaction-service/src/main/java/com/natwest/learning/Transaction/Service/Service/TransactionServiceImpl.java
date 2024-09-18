package com.natwest.learning.Transaction.Service.Service;

import com.natwest.learning.Transaction.Service.Model.Transaction;
import com.natwest.learning.Transaction.Service.Model.TransactionInfo;
import com.natwest.learning.Transaction.Service.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class TransactionServiceImpl implements TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;
    @Override
    public TransactionInfo addTransaction(String userId, Transaction transaction) {
        Optional<TransactionInfo> transactionOptional = transactionRepository.findById(userId);
        if (transactionOptional.isPresent()) {
            TransactionInfo watchlist = transactionOptional.get();
            List<Transaction> stockList = watchlist.getTransactionList();
            if (!stockList.contains(transaction)) {
                stockList.add(transaction);
                transactionRepository.save(watchlist);
                return watchlist;
            }
            return null;
        } else {
            List<Transaction> stockList = new ArrayList<>();
            stockList.add(transaction);
            TransactionInfo newWatchList = new TransactionInfo(userId, stockList);
            transactionRepository.save(newWatchList);
            return newWatchList;
        }
    }

    @Override
    public List<Transaction> getAllTransactionsByUserId(String userId) {
        Optional<TransactionInfo> watchlistOptional = transactionRepository.findById(userId);
        if (watchlistOptional.isPresent()) {
            TransactionInfo watchlist = watchlistOptional.get();
            return watchlist.getTransactionList();
        } else {
            return null;
        }
    }

    @Override
    public TransactionInfo getTransactionByTransactionId(String userId, String transactionID) {
        return null;
    }

    @Override
    public TransactionInfo updateTransaction(String userId, String portfolioId, Transaction updatedPortfolio) {
        return null;
    }

    @Override
    public boolean deleteTransaction(String userId, String portfolioId) {
        return false;
    }
}
