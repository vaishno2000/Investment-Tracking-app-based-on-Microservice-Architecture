package com.tracker.investment.wishlist.service;

import com.tracker.investment.wishlist.model.Stock;
import com.tracker.investment.wishlist.model.Watchlist;
import com.tracker.investment.wishlist.repository.Repository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.OngoingStubbing;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class WatchlistServiceImplTest {

    @InjectMocks
    private WatchlistServiceImpl service;

    @Mock
    private Repository repository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddStock_NewWatchlist() {
        String userId = "user123";
        Stock stock = new Stock("AAPL", "Apple Inc.");

        when(repository.findById(userId)).thenReturn(Optional.empty());

        boolean result = service.addStock(userId, stock);

        assertTrue(result);
        verify(repository).save(any(Watchlist.class));
    }

    @Test
    public void testAddStock_ExistingWatchlist() {
        String userId = "user123";
        Stock stock = new Stock("AAPL", "Apple Inc.");

        Watchlist watchlist = new Watchlist(userId, new ArrayList<>());
        when(repository.findById(userId)).thenReturn(Optional.of(watchlist));

        boolean result = service.addStock(userId, stock);

        assertTrue(result);
        assertTrue(watchlist.getStockList().contains(stock));
        verify(repository).save(watchlist);
    }

    @Test
    public void testAddStock_ExistingWatchlist_StockExists() {
        String userId = "user123";
        Stock stock = new Stock("AAPL", "Apple Inc.");

        List<Stock> stockList = new ArrayList<>();
        stockList.add(stock);

        Watchlist watchlist = new Watchlist(userId, stockList);
        when(repository.findById(userId)).thenReturn(Optional.of(watchlist));

        boolean result = service.addStock(userId, stock);

        assertFalse(result);
        assertEquals(1, watchlist.getStockList().size());
        verify(repository, never()).save(any(Watchlist.class));
    }

    @Test
    public void testGetAllStocks_WatchlistExists() {
        String userId = "user123";
        Stock stock1 = new Stock("AAPL", "Apple Inc.");
        Stock stock2 = new Stock("GOOGL", "Alphabet Inc.");

        List<Stock> stockList = new ArrayList<>();
        stockList.add(stock1);
        stockList.add(stock2);

        Watchlist watchlist = new Watchlist(userId, stockList);
        when(repository.findById(userId)).thenReturn(Optional.of(watchlist));

        List<Stock> result = service.getAllStocks(userId);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(stock1));
        assertTrue(result.contains(stock2));
    }

    @Test
    public void testGetAllStocks_WatchlistNotExists() {
        String userId = "user123";

        when(repository.findById(userId)).thenReturn(Optional.empty());

        List<Stock> result = service.getAllStocks(userId);

        assertNull(result);
    }

    @Test
    public void testDeleteStock_WatchlistExists() {
        String userId = "user123";
        Stock stock1 = new Stock("AAPL", "Apple Inc.");
        Stock stock2 = new Stock("GOOGL", "Alphabet Inc.");

        List<Stock> stockList = new ArrayList<>();
        stockList.add(stock1);
        stockList.add(stock2);

        Watchlist watchlist = new Watchlist(userId, stockList);
        when(repository.findById(userId)).thenReturn(Optional.of(watchlist));

        boolean result = service.deleteStock(userId, stock1);

        assertTrue(result);
        assertEquals(1, watchlist.getStockList().size());
        assertFalse(watchlist.getStockList().contains(stock1));
        verify(repository).save(watchlist);
    }

    @Test
    public void testDeleteStock_WatchlistExists_StockNotExists() {
        String userId = "user123";
        Stock stock1 = new Stock("AAPL", "Apple Inc.");
        Stock stock2 = new Stock("GOOGL", "Alphabet Inc.");

        List<Stock> stockList = new ArrayList<>();
        stockList.add(stock1);

        Watchlist watchlist = new Watchlist(userId, stockList);
        when(repository.findById(userId)).thenReturn(Optional.of(watchlist));

        boolean result = service.deleteStock(userId, stock2);

        assertFalse(result);
        assertEquals(1, watchlist.getStockList().size());
        verify(repository, never()).save(any(Watchlist.class));
    }

    @Test
    public void testDeleteStock_WatchlistNotExists() {
        String userId = "user123";
        Stock stock1 = new Stock("AAPL", "Apple Inc.");

        when(repository.findById(userId)).thenReturn(Optional.empty());

        boolean result = service.deleteStock(userId, stock1);

        assertFalse(result);
        verify(repository, never()).save(any(Watchlist.class));
    }
}
