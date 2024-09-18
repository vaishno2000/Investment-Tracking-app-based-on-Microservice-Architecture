package com.natwest.project.addremovestock.service;

import com.natwest.project.addremovestock.model.Stock;
import com.natwest.project.addremovestock.model.UserPortfolioIdentity;
import com.natwest.project.addremovestock.model.UserPortfolioInfo;
import com.natwest.project.addremovestock.repository.StockRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StockServiceImplTest {
    @Mock
    private StockRepository stockRepository;

    @InjectMocks
    private StockServiceImpl stockService;

    private UserPortfolioInfo userPortfolioInfo1,userPortfolioInfo2;
    private List<Stock> stockList1=new ArrayList<>();
    private List<Stock> stockList2=new ArrayList<>();
    private UserPortfolioIdentity userPortfolioIdentity1,userPortfolioIdentity2;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userPortfolioIdentity1=new UserPortfolioIdentity("nikhil@gmail.com","portfolio1");
        userPortfolioIdentity2=new UserPortfolioIdentity("tanya@gmail.com","portfolio2");
        stockList1.add(new Stock("AAPL","Apple",3,100,new Date()));
        stockList1.add(new Stock("GOOGL","Alphabet Inc Class A",4,200,new Date()));
        stockList1.add(new Stock("ADBE","Adobe Inc",5,300,new Date()));
        stockList2.add(new Stock("RELI","Reliance Global Group, Inc.",5,300,new Date()));
        stockList2.add(new Stock("MSFT","Microsoft Corp",4,200,new Date()));
        stockList2.add(new Stock("META","Meta Platforms Inc",3,100,new Date()));
        userPortfolioInfo1 = new UserPortfolioInfo(userPortfolioIdentity1,stockList1);
        userPortfolioInfo2=new UserPortfolioInfo(userPortfolioIdentity2,stockList2);
    }

    @AfterEach
    public void tearDown() {
        userPortfolioIdentity1 = null;
        userPortfolioIdentity2 = null;
        stockList1=null;
        stockList2=null;
        userPortfolioInfo1=null;
        userPortfolioInfo2=null;
    }

    @Test
    public void givenUserInfoToSaveThenShouldReturnTrue() {
        when(stockRepository.save(any())).thenReturn(userPortfolioInfo1);
        assertEquals(true, stockService.addUserPortfolio(userPortfolioInfo1));
        verify(stockRepository, times(1)).save(any());
    }

    @Test
    public void givenGetStocksThenShouldReturnListOfAllStocks() {
        stockRepository.save(userPortfolioInfo1);
        when(stockRepository.findById(userPortfolioIdentity1)).thenReturn(Optional.ofNullable(userPortfolioInfo1));
        List<Stock> gatheredStockList = stockService.getStocks(userPortfolioIdentity1);
        assertEquals(gatheredStockList, stockList1);
        verify(stockRepository, times(1)).findById(userPortfolioIdentity1);
    }
    @Test
    void givenUserPortfolioIdToDeleteThenShouldReturnTrue() {
        when(stockRepository.findById(userPortfolioIdentity2)).thenReturn(Optional.ofNullable(userPortfolioInfo2));
        Boolean flag = stockService.deleteUserPortfolio(userPortfolioIdentity2);
        assertEquals(true, flag);

        verify(stockRepository, times(1)).findById(userPortfolioIdentity2);
        verify(stockRepository, times(1)).deleteById(userPortfolioIdentity2);
    }
    @Test
    void givenUserPortfolioIdToDeleteThenShouldReturnFalse() {
        when(stockRepository.findById(userPortfolioIdentity2)).thenReturn(Optional.empty());
        Boolean flag = stockService.deleteUserPortfolio(userPortfolioIdentity2);
        assertEquals(false, flag);
        verify(stockRepository, times(1)).findById(userPortfolioIdentity2);
        verify(stockRepository, times(0)).deleteById(userPortfolioIdentity2);
    }

    @Test
    public void givenUserPortfolioInfoToUpdateThenShouldReturnTrue() {
        when(stockRepository.save(userPortfolioInfo1)).thenReturn(userPortfolioInfo1);
        userPortfolioInfo1.setStockList(stockList2);
        Boolean flag = stockService.updateUserPortfolio(userPortfolioInfo1);
        assertEquals(flag, true);
        verify(stockRepository, times(1)).save(userPortfolioInfo1);
    }

    /*@Test
    public void givenUserPortfolioInfoToUpdateThenShouldReturnTrue() {
        when(stockRepository.findById(userPortfolioIdentity1)).thenReturn(Optional.ofNullable(userPortfolioInfo1));
        when(stockRepository.save(userPortfolioInfo1)).thenReturn(userPortfolioInfo1);
        userPortfolioInfo1.setStockList(stockList2);
        Boolean flag = stockService.updateUserPortfolio(userPortfolioInfo1);
        assertEquals(flag, true);
        verify(stockRepository, times(1)).save(userPortfolioInfo1);
        verify(stockRepository, times(1)).findById(userPortfolioIdentity1);
    }

    @Test
    public void givenBlogToUpdateThenShouldNotReturnUpdatedBlog() {
        when(stockRepository.findById(userPortfolioIdentity1)).thenReturn(Optional.empty());
        Boolean flag = stockService.updateUserPortfolio(userPortfolioInfo1);
        assertEquals(false, flag);
        verify(stockRepository, times(1)).findById(userPortfolioIdentity1);
        verify(stockRepository, times(0)).save(userPortfolioInfo1);
    }*/
}