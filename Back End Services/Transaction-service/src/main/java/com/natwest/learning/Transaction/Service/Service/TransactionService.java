package com.natwest.learning.Transaction.Service.Service;

import com.natwest.learning.Transaction.Service.Model.Transaction;
import com.natwest.learning.Transaction.Service.Model.TransactionInfo;
import com.natwest.learning.Transaction.Service.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface TransactionService {
    TransactionInfo addTransaction(String userId, Transaction transaction);
    List<Transaction> getAllTransactionsByUserId(String userId);
    TransactionInfo getTransactionByTransactionId(String userId, String transactionID);
    TransactionInfo updateTransaction(String userId, String transactionID, Transaction updatedTransaction);
    boolean deleteTransaction(String userId, String portfolioId);

}
