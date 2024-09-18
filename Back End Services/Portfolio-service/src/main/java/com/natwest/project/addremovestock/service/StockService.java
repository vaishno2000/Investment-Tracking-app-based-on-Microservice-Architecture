package com.natwest.project.addremovestock.service;

import com.natwest.project.addremovestock.model.Stock;
import com.natwest.project.addremovestock.model.UserPortfolioIdentity;
import com.natwest.project.addremovestock.model.UserPortfolioInfo;

import java.util.List;

public interface StockService {
    boolean addUserPortfolio(UserPortfolioInfo upInfo);
    List<Stock> getStocks(UserPortfolioIdentity upId);
    boolean updateUserPortfolio(UserPortfolioInfo upInfo);
    boolean deleteUserPortfolio(UserPortfolioIdentity upId);
}
