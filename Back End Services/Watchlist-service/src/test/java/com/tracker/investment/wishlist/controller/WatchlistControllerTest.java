package com.tracker.investment.wishlist.controller;

import com.tracker.investment.wishlist.model.Stock;
import com.tracker.investment.wishlist.service.WatchlistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class WatchlistControllerTest {

    @InjectMocks
    private WatchlistController controller;

    @Mock
    private WatchlistService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddStock_Success() {
        String userId = "user123";
        Stock stock = new Stock("AAPL", "Apple Inc.");

        when(service.addStock(userId, stock)).thenReturn(true);

        ResponseEntity<?> response = controller.addStock(userId, stock);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Stock successfully added", response.getBody());
    }

    @Test
    public void testAddStock_Failure() {
        String userId = "user123";
        Stock stock = new Stock("AAPL", "Apple Inc.");

        when(service.addStock(userId, stock)).thenReturn(false);

        ResponseEntity<?> response = controller.addStock(userId, stock);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Stock add Failed", response.getBody());
    }

    @Test
    public void testGetStocks() {
        String userId = "user123";
        List<Stock> stockList = new ArrayList<>();
        stockList.add(new Stock("AAPL", "Apple Inc."));
        stockList.add(new Stock("GOOGL", "Alphabet Inc."));

        when(service.getAllStocks(userId)).thenReturn(stockList);

        ResponseEntity<?> response = controller.getStocks(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(stockList, response.getBody());
    }

    @Test
    public void testDeleteStock_Success() {
        String userId = "user123";
        Stock stock = new Stock("AAPL", "Apple Inc.");

        when(service.deleteStock(userId, stock)).thenReturn(true);

        ResponseEntity<?> response = controller.deleteStocks(userId, stock);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Stock successfully deleted", response.getBody());
    }

    @Test
    public void testDeleteStock_Failure() {
        String userId = "user123";
        Stock stock = new Stock("AAPL", "Apple Inc.");

        when(service.deleteStock(userId, stock)).thenReturn(false);

        ResponseEntity<?> response = controller.deleteStocks(userId, stock);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Stock delete Failed", response.getBody());
    }
}
