package com.natwest.project.addremovestock.controller;

import com.natwest.project.addremovestock.model.Stock;
import com.natwest.project.addremovestock.model.UserPortfolioIdentity;
import com.natwest.project.addremovestock.model.UserPortfolioInfo;
import com.natwest.project.addremovestock.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/userPortfolioInfo")
@CrossOrigin
public class StockController {
    @Autowired
    private StockService service;


    @PostMapping
    public ResponseEntity<?> addPortfoilioInfo(@RequestBody UserPortfolioInfo upInfo){
        boolean flag=service.addUserPortfolio(upInfo);
        if(flag){
            return new ResponseEntity<String>("UserPortfolio added Successfully", HttpStatus.CREATED);
        }else {
            return new ResponseEntity<String>("Error occurred", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{userId}/{portfolioId}")
    public ResponseEntity<?> getAllStocks(@PathVariable String userId,@PathVariable String portfolioId){
        UserPortfolioIdentity upId=new UserPortfolioIdentity(userId,portfolioId);
        List<Stock> allStocks=service.getStocks(upId);
        if(allStocks!=null){
            return new ResponseEntity<List<Stock>>(allStocks,HttpStatus.OK);
        }else{
            return new ResponseEntity<String>("Error occurred", HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/{userId}/{portfolioId}")
    public ResponseEntity<?> updateUserPortfolio(@PathVariable String userId,@PathVariable String portfolioId,@RequestBody List<Stock> stockList){
        UserPortfolioIdentity upId=new UserPortfolioIdentity(userId,portfolioId);
        UserPortfolioInfo updatedInfo=new UserPortfolioInfo(upId,stockList);
        boolean flag=service.updateUserPortfolio(updatedInfo);
        if(flag){
            return new ResponseEntity<String>("UserPortfolio updated Successfully", HttpStatus.ACCEPTED);
        }else {
            return new ResponseEntity<String>("Error occurred", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}/{portfolioId}")
    public ResponseEntity<?> deleteUserPortfolio(@PathVariable String userId,@PathVariable String portfolioId){
        UserPortfolioIdentity upId=new UserPortfolioIdentity(userId,portfolioId);
        boolean flag=service.deleteUserPortfolio(upId);
        if(flag){
            return new ResponseEntity<String>("UserPortfolio Deleted Successfully", HttpStatus.ACCEPTED);
        }else {
            return new ResponseEntity<String>("Error occurred", HttpStatus.NOT_FOUND);
        }
    }
}
