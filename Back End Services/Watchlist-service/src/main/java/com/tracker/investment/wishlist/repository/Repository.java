package com.tracker.investment.wishlist.repository;

import com.tracker.investment.wishlist.model.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Repository extends MongoRepository<Watchlist,String> {
}
