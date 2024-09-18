package com.tracker.investment.wishlist.model;

import com.tracker.investment.wishlist.model.Stock;
import com.tracker.investment.wishlist.model.Watchlist;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class WatchlistTest {

    private Watchlist watchlist1;
    private Watchlist watchlist2;

    @BeforeEach
    public void setUp() {
        List<Stock> stockList1 = new ArrayList<>();
        stockList1.add(new Stock("AAPL", "Apple Inc."));
        stockList1.add(new Stock("GOOGL", "Alphabet Inc."));
        watchlist1 = new Watchlist("user1", stockList1);

        List<Stock> stockList2 = new ArrayList<>();
        stockList2.add(new Stock("MSFT", "Microsoft"));
        watchlist2 = new Watchlist("user2", stockList2);
    }

    @Test
    public void testGetters() {
        assertEquals("user1", watchlist1.getUserID());
        assertEquals(2, watchlist1.getStockList().size());
        assertEquals("AAPL", watchlist1.getStockList().get(0).getSymbol());
        assertEquals("Apple Inc.", watchlist1.getStockList().get(0).getName());
    }

    @Test
    public void testSetters() {
        watchlist1.setUserID("user3");
        assertEquals("user3", watchlist1.getUserID());

        List<Stock> newStockList = new ArrayList<>();
        newStockList.add(new Stock("AMZN", "Amazon.com"));
        watchlist1.setStockList(newStockList);
        assertEquals(1, watchlist1.getStockList().size());
        assertEquals("AMZN", watchlist1.getStockList().get(0).getSymbol());
        assertEquals("Amazon.com", watchlist1.getStockList().get(0).getName());
    }

    @Test
    public void testDefaultConstructor() {
        Watchlist emptyWatchlist = new Watchlist();
        assertNull(emptyWatchlist.getUserID());
        assertNull(emptyWatchlist.getStockList());
    }
}
