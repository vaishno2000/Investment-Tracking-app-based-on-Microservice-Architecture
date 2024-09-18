package com.tracker.investment.wishlist.service;

import com.tracker.investment.wishlist.model.Stock;
import com.tracker.investment.wishlist.model.Watchlist;
import com.tracker.investment.wishlist.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchlistService {

    @Autowired
    private Repository repository;

    @Override
    public boolean addStock(String userId, Stock s) {
        Optional<Watchlist> watchlistOptional = repository.findById(userId);
        if (watchlistOptional.isPresent()) {
            Watchlist watchlist = watchlistOptional.get();
            List<Stock> stockList = watchlist.getStockList();
            if (!stockList.contains(s)) {
                stockList.add(s);
                repository.save(watchlist);
                return true;
            }
            return false;
        } else {
            List<Stock> stockList = new ArrayList<>();
            stockList.add(s);
            Watchlist newWatchList = new Watchlist(userId, stockList);
            repository.save(newWatchList);
            return true;
        }
    }


    @Override
    public List<Stock> getAllStocks(String userId) {
        Optional<Watchlist> watchlistOptional = repository.findById(userId);
        if (watchlistOptional.isPresent()) {
            Watchlist watchlist = watchlistOptional.get();
            return watchlist.getStockList();
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteStock(String userId, Stock s) {
        Optional<Watchlist> watchlistOptional = repository.findById(userId);
        if (watchlistOptional.isPresent()) {
            Watchlist watchlist = watchlistOptional.get();
            List<Stock> stockList = watchlist.getStockList();
            boolean removed = stockList.removeIf(stock -> stock.getSymbol().equals(s.getSymbol()));
            if (removed) {
                repository.save(watchlist);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
