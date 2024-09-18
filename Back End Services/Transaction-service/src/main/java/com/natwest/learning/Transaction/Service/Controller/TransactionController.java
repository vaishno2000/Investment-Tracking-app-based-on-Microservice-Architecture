package com.natwest.learning.Transaction.Service.Controller;

import com.natwest.learning.Transaction.Service.Model.Transaction;
import com.natwest.learning.Transaction.Service.Model.TransactionInfo;
import com.natwest.learning.Transaction.Service.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    private TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }
    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createPortfolio(@PathVariable String userId, @RequestBody Transaction transactionInfo) {
        TransactionInfo createdPortfolioInfo = transactionService.addTransaction(userId, transactionInfo);
        if (createdPortfolioInfo != null) {
            return new ResponseEntity<>(createdPortfolioInfo, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create portfolio", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getPortfoliosByUserId(@PathVariable String userId) {
        List<Transaction> portfolios = transactionService.getAllTransactionsByUserId(userId);
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

}
