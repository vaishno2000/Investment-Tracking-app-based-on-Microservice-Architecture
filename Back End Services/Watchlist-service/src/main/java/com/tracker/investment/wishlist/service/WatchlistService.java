package com.tracker.investment.wishlist.service;

import com.tracker.investment.wishlist.model.Stock;
import com.tracker.investment.wishlist.model.Watchlist;

import java.util.List;

public interface WatchlistService {
    public boolean addStock(String userId,Stock s);
    public List<Stock> getAllStocks(String userId);
    public boolean deleteStock(String userId,Stock s);

}
