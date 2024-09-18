package com.natwest.training.Dashboard;

import com.natwest.training.Dashboard.controller.PortfolioController;
import com.natwest.training.Dashboard.model.Portfolio;
import com.natwest.training.Dashboard.model.PortfolioInfo;
import com.natwest.training.Dashboard.service.PortfolioInfoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class PortfolioControllerTest {

    @InjectMocks
    private PortfolioController portfolioController;

    @Mock
    private PortfolioInfoService portfolioInfoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreatePortfolio() {
        String userId = "testUser";
        Portfolio portfolio = new Portfolio("1", "Test Portfolio", "Type", "Description");
        PortfolioInfo createdPortfolioInfo = new PortfolioInfo(userId, new ArrayList<>());

        when(portfolioInfoService.createPortfolio(userId, portfolio)).thenReturn(createdPortfolioInfo);

        ResponseEntity<?> response = portfolioController.createPortfolio(userId, portfolio);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(createdPortfolioInfo, response.getBody());
    }

    @Test
    public void testCreatePortfolioFailure() {
        String userId = "testUser";
        Portfolio portfolio = new Portfolio("1", "Test Portfolio", "Type", "Description");

        when(portfolioInfoService.createPortfolio(userId, portfolio)).thenReturn(null);

        ResponseEntity<?> response = portfolioController.createPortfolio(userId, portfolio);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to create portfolio", response.getBody());
    }

    @Test
    public void testGetPortfoliosByUserId() {
        String userId = "testUser";
        List<Portfolio> portfolios = new ArrayList<>();
        portfolios.add(new Portfolio("1", "Test Portfolio 1", "Type 1", "Description 1"));
        portfolios.add(new Portfolio("2", "Test Portfolio 2", "Type 2", "Description 2"));

        when(portfolioInfoService.getAllPortfoliosByUserId(userId)).thenReturn(portfolios);

        ResponseEntity<List<Portfolio>> response = portfolioController.getPortfoliosByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(portfolios, response.getBody());
    }

    @Test
    public void testGetPortfolioById() {
        String userId = "testUser";
        String portfolioId = "1";
        PortfolioInfo portfolioInfo = new PortfolioInfo(userId, new ArrayList<>());
        portfolioInfo.getPortfolios().add(new Portfolio(portfolioId, "Test Portfolio", "Type", "Description"));

        when(portfolioInfoService.getPortfolioByPortfolioId(userId, portfolioId)).thenReturn(portfolioInfo);

        ResponseEntity<PortfolioInfo> response = portfolioController.getPortfolioById(userId, portfolioId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(portfolioInfo, response.getBody());
    }

    @Test
    public void testGetPortfolioByIdNotFound() {
        String userId = "testUser";
        String portfolioId = "1";

        when(portfolioInfoService.getPortfolioByPortfolioId(userId, portfolioId)).thenReturn(null);

        ResponseEntity<PortfolioInfo> response = portfolioController.getPortfolioById(userId, portfolioId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    public void testUpdatePortfolio() {
        String userId = "testUser";
        String portfolioId = "1";
        Portfolio updatedPortfolio = new Portfolio(portfolioId, "Updated Portfolio", "Updated Type", "Updated Description");
        PortfolioInfo updatedPortfolioInfo = new PortfolioInfo(userId, new ArrayList<>());
        updatedPortfolioInfo.getPortfolios().add(updatedPortfolio);

        when(portfolioInfoService.updatePortfolio(userId, portfolioId, updatedPortfolio)).thenReturn(updatedPortfolioInfo);

        ResponseEntity<PortfolioInfo> response = portfolioController.updatePortfolio(userId, portfolioId, updatedPortfolio);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedPortfolioInfo, response.getBody());
    }

    @Test
    public void testUpdatePortfolioNotFound() {
        String userId = "testUser";
        String portfolioId = "1";
        Portfolio updatedPortfolio = new Portfolio(portfolioId, "Updated Portfolio", "Updated Type", "Updated Description");

        when(portfolioInfoService.updatePortfolio(userId, portfolioId, updatedPortfolio)).thenReturn(null);

        ResponseEntity<PortfolioInfo> response = portfolioController.updatePortfolio(userId, portfolioId, updatedPortfolio);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    public void testDeletePortfolio() {
        String userId = "testUser";
        String portfolioId = "1";

        ResponseEntity<?> response = portfolioController.deletePortfolio(userId, portfolioId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());

        verify(portfolioInfoService, times(1)).deletePortfolio(userId, portfolioId);
    }
}
