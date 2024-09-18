package com.natwest.training.Dashboard.controller;

import com.natwest.training.Dashboard.model.Portfolio;
import com.natwest.training.Dashboard.model.PortfolioInfo;
import com.natwest.training.Dashboard.service.PortfolioInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    private final PortfolioInfoService portfolioInfoService;

    @Autowired
    public PortfolioController(PortfolioInfoService portfolioInfoService) {
        this.portfolioInfoService = portfolioInfoService;
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createPortfolio(@PathVariable String userId, @RequestBody Portfolio portfolio) {
        PortfolioInfo createdPortfolioInfo = portfolioInfoService.createPortfolio(userId, portfolio);
        if (createdPortfolioInfo != null) {
            return new ResponseEntity<>(createdPortfolioInfo, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create portfolio", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<Portfolio>> getPortfoliosByUserId(@PathVariable String userId) {
        List<Portfolio> portfolios = portfolioInfoService.getAllPortfoliosByUserId(userId);
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    @GetMapping("/{userId}/{portfolioId}")
    public ResponseEntity<PortfolioInfo> getPortfolioById(
            @PathVariable String userId,
            @PathVariable String portfolioId) {
        PortfolioInfo portfolioInfo = portfolioInfoService.getPortfolioByPortfolioId(userId, portfolioId);
        if (portfolioInfo != null) {
            return new ResponseEntity<>(portfolioInfo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userId}/{portfolioId}")
    public ResponseEntity<PortfolioInfo> updatePortfolio(
            @PathVariable String userId,
            @PathVariable String portfolioId,
            @RequestBody Portfolio updatedPortfolio) {
        PortfolioInfo updatedPortfolioInfo = portfolioInfoService.updatePortfolio(userId, portfolioId, updatedPortfolio);
        if (updatedPortfolioInfo != null) {
            return new ResponseEntity<>(updatedPortfolioInfo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}/{portfolioId}")
    public ResponseEntity<?> deletePortfolio(
            @PathVariable String userId,
            @PathVariable String portfolioId) {
        portfolioInfoService.deletePortfolio(userId, portfolioId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
