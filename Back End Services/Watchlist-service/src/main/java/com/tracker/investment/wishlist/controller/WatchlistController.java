package com.tracker.investment.wishlist.controller;

import com.tracker.investment.wishlist.model.Stock;
import com.tracker.investment.wishlist.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WatchlistController {
    @Autowired
    private WatchlistService service;
    private ResponseEntity<?> response;

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addStock(@PathVariable String userId, @RequestBody Stock s) {
        boolean stockAdded = service.addStock(userId, s);
        if (stockAdded) {
            return new ResponseEntity<String>("Stock successfully added", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Stock add Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/stocks/{userId}")
    public ResponseEntity<?> getStocks(@PathVariable String userId) {
        List<Stock> list = service.getAllStocks(userId);
        return new ResponseEntity<List<Stock>>(list, HttpStatus.OK);
    }

    @DeleteMapping("/stocks/delete/{userId}")
    public ResponseEntity<?> deleteStocks(@PathVariable String userId, @RequestBody Stock s) {
        boolean stockDeleted = service.deleteStock(userId, s);
        if (stockDeleted) {
            return new ResponseEntity<String>("Stock successfully deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Stock delete Failed", HttpStatus.BAD_REQUEST);
        }
    }
}
