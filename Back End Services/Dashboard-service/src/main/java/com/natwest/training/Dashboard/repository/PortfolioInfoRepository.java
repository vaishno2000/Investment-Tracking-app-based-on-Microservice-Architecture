package com.natwest.training.Dashboard.repository;

import com.natwest.training.Dashboard.model.Portfolio;
import com.natwest.training.Dashboard.model.PortfolioInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioInfoRepository extends MongoRepository<PortfolioInfo, String> {

}