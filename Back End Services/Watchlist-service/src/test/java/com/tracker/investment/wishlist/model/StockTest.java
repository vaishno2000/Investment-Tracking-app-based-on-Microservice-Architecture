package com.tracker.investment.wishlist.model;

import com.tracker.investment.wishlist.model.Stock;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class StockTest {

    private Stock stock1;
    private Stock stock2;

    @BeforeEach
    public void setUp() {
        stock1 = new Stock("AAPL", "Apple Inc.");
        stock2 = new Stock("GOOGL", "Alphabet Inc.");
    }

    @Test
    public void testGetters() {
        assertEquals("AAPL", stock1.getSymbol());
        assertEquals("Apple Inc.", stock1.getName());
    }

    @Test
    public void testSetters() {
        stock1.setSymbol("MSFT");
        stock1.setName("Microsoft");

        assertEquals("MSFT", stock1.getSymbol());
        assertEquals("Microsoft", stock1.getName());
    }

    @Test
    public void testEqualsAndHashCode() {
        // Two stocks with the same symbol and name should be equal
        Stock stock1Copy = new Stock("AAPL", "Apple Inc.");
        assertEquals(stock1, stock1Copy);
        assertEquals(stock1.hashCode(), stock1Copy.hashCode());

        // Two stocks with different symbols should not be equal
        assertNotEquals(stock1, stock2);

        // Two stocks with different names should not be equal
        Stock stock1DifferentName = new Stock("AAPL", "Apple");
        assertNotEquals(stock1, stock1DifferentName);

        // Two stocks with different symbols and names should not be equal
        Stock differentStock = new Stock("MSFT", "Microsoft");
        assertNotEquals(stock1, differentStock);
    }
}
