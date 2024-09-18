package com.natwest.project.addremovestock.repository;

import com.natwest.project.addremovestock.model.Stock;
import com.natwest.project.addremovestock.model.UserPortfolioIdentity;
import com.natwest.project.addremovestock.model.UserPortfolioInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StockRepository extends MongoRepository<UserPortfolioInfo, UserPortfolioIdentity> {

}
