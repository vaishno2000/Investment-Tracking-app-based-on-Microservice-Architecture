package com.natwest.training.Dashboard.service;

import com.natwest.training.Dashboard.model.Portfolio;
import com.natwest.training.Dashboard.model.PortfolioInfo;

import java.util.List;

public interface PortfolioInfoService {
    PortfolioInfo createPortfolio(String userId, Portfolio portfolio);

    List<Portfolio> getAllPortfoliosByUserId(String userId);

    PortfolioInfo getPortfolioByPortfolioId(String userId, String portfolioId);

    PortfolioInfo updatePortfolio(String userId, String portfolioId, Portfolio updatedPortfolio);

    boolean deletePortfolio(String userId, String portfolioId);
}
