package com.natwest.project.addremovestock.service;

import com.natwest.project.addremovestock.model.Stock;
import com.natwest.project.addremovestock.model.UserPortfolioIdentity;
import com.natwest.project.addremovestock.model.UserPortfolioInfo;
import com.natwest.project.addremovestock.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;
@Service
public class StockServiceImpl implements StockService{
    @Autowired
    private StockRepository repository;


    @Override
    public boolean addUserPortfolio(UserPortfolioInfo upInfo) {
        UserPortfolioInfo added=repository.save(upInfo);
        if(added!=null){
            return true;
        }
        return false;
    }
    @Override
    public List<Stock> getStocks(UserPortfolioIdentity upId) {
        UserPortfolioInfo portfolioInfo= repository.findById(upId).get();
        return portfolioInfo.getStockList();
    }

    @Override
    public boolean updateUserPortfolio(UserPortfolioInfo upInfo) {
        UserPortfolioInfo updated=repository.save(upInfo);
        if(updated!=null){
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteUserPortfolio(UserPortfolioIdentity upId) {
        if(repository.findById(upId).isPresent()){
            repository.deleteById(upId);
            return true;
        }
        return false;
    }
}
