package com.natwest.training.Dashboard.service;

import com.natwest.training.Dashboard.model.Portfolio;
import com.natwest.training.Dashboard.model.PortfolioInfo;
import com.natwest.training.Dashboard.repository.PortfolioInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class PortfolioInfoServiceImpl implements PortfolioInfoService {

    @Autowired
    private PortfolioInfoRepository portfolioInfoRepository;

    @Override
    public PortfolioInfo createPortfolio(String userId, Portfolio portfolio) {


        Optional<PortfolioInfo> watchlistOptional = portfolioInfoRepository.findById(userId);
        if (watchlistOptional.isPresent()) {
            PortfolioInfo watchlist = watchlistOptional.get();
            List<Portfolio> stockList = watchlist.getPortfolios();
            if (!stockList.contains(portfolio)) {
                stockList.add(portfolio);
                portfolioInfoRepository.save(watchlist);
                return watchlist;
            }
            return null;
        } else {
            List<Portfolio> stockList = new ArrayList<>();
            stockList.add(portfolio);
            PortfolioInfo newWatchList = new PortfolioInfo(userId, stockList);
            portfolioInfoRepository.save(newWatchList);
            return newWatchList;
        }
    }
    @Override
    public List<Portfolio> getAllPortfoliosByUserId(String userId) {
        Optional<PortfolioInfo> watchlistOptional = portfolioInfoRepository.findById(userId);
        if (watchlistOptional.isPresent()) {
            PortfolioInfo watchlist = watchlistOptional.get();
            return watchlist.getPortfolios();
        } else {
            return null;
        }
    }

    @Override
    public PortfolioInfo getPortfolioByPortfolioId(String userId, String portfolioId) {
        Optional<PortfolioInfo> portfolioInfoOptional = portfolioInfoRepository.findById(userId);

        if (portfolioInfoOptional.isPresent()) {
            PortfolioInfo portfolioInfo = portfolioInfoOptional.get();
            Optional<Portfolio> portfolioOptional = portfolioInfo.getPortfolios().stream()
                    .filter(p -> p.getPortfolioId().equals(portfolioId))
                    .findFirst();

            if (portfolioOptional.isPresent()) {
                PortfolioInfo portfolioInfoCopy = new PortfolioInfo(); // Use the default constructor
                portfolioInfoCopy.setUserId(portfolioInfo.getUserId());
                portfolioInfoCopy.setPortfolios(Collections.singletonList(portfolioOptional.get()));
                return portfolioInfoCopy;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }



    @Override
    public PortfolioInfo updatePortfolio(String userId, String portfolioId, Portfolio updatedPortfolio) {
        Optional<PortfolioInfo> portfolioInfoOptional = portfolioInfoRepository.findById(userId);

        if (portfolioInfoOptional.isPresent()) {
            PortfolioInfo portfolioInfo = portfolioInfoOptional.get();
            List<Portfolio> portfolios = portfolioInfo.getPortfolios();

            Optional<Portfolio> portfolioOptional = portfolios.stream()
                    .filter(p -> p.getPortfolioId().equals(portfolioId))
                    .findFirst();

            if (portfolioOptional.isPresent()) {
                Portfolio portfolioToUpdate = portfolioOptional.get();
                portfolioToUpdate.setPortfolioName(updatedPortfolio.getPortfolioName());
                portfolioToUpdate.setInvestmentType(updatedPortfolio.getInvestmentType());
                portfolioToUpdate.setDescription(updatedPortfolio.getDescription());
                portfolioInfoRepository.save(portfolioInfo);

                return portfolioInfo;
            }
        }

        return null;
    }


    @Override
    public boolean deletePortfolio(String userId, String portfolioId) {
        Optional<PortfolioInfo> watchlistOptional = portfolioInfoRepository.findById(userId);
        if (watchlistOptional.isPresent()) {
            PortfolioInfo watchlist = watchlistOptional.get();
            List<Portfolio> stockList = watchlist.getPortfolios();
            boolean removed = stockList.removeIf(stock -> stock.getPortfolioId().equals(portfolioId));
            if (removed) {
                portfolioInfoRepository.save(watchlist);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
