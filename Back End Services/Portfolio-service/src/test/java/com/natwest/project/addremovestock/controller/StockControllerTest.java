package com.natwest.project.addremovestock.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.natwest.project.addremovestock.model.Stock;
import com.natwest.project.addremovestock.model.UserPortfolioIdentity;
import com.natwest.project.addremovestock.model.UserPortfolioInfo;
import com.natwest.project.addremovestock.service.StockService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class StockControllerTest {
    private MockMvc mockMvc;
    @Mock
    StockService stockService;
    @InjectMocks
    private StockController stockController;
    private UserPortfolioInfo userPortfolioInfo1,userPortfolioInfo2;
    private List<Stock> stockList1=new ArrayList<>();
    private List<Stock> stockList2=new ArrayList<>();
    private UserPortfolioIdentity userPortfolioIdentity1,userPortfolioIdentity2;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(stockController).build();
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
    public void givenUserPortfolioInfoToSaveThenShouldReturnSuccessMessage() throws Exception {
        when(stockService.addUserPortfolio(any())).thenReturn(true);
        mockMvc.perform(post("/api/v1/userPortfolioInfo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userPortfolioInfo1))
                        .characterEncoding("utf-8"))
                .andExpect(status().isCreated())
                .andDo(MockMvcResultHandlers.print());
        verify(stockService).addUserPortfolio(any());
    }

    @Test
    public void givenUserPortfolioInfoToSaveThenShouldReturnBadRequest() throws Exception {
        when(stockService.addUserPortfolio(any())).thenReturn(false);
        mockMvc.perform(post("/api/v1/userPortfolioInfo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userPortfolioInfo1))
                        .characterEncoding("utf-8"))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());
        verify(stockService).addUserPortfolio(any());
    }

    @Test
    public void givenUserPortfolioIdThenShouldReturnListOfAllStocks() throws Exception {
        when(stockService.getStocks(any())).thenReturn(stockList1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/userPortfolioInfo/nikhil@gmail.com/portfolio1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(stockService).getStocks(any());
        verify(stockService, times(1)).getStocks(any());

    }

    @Test
    public void givenUserPortfolioIdThenShouldReturnNotFoundMessage() throws Exception {
        when(stockService.getStocks(any())).thenReturn(null);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/userPortfolioInfo/nikhil@gmail.com/portfolio1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound()).andDo(MockMvcResultHandlers.print());
        verify(stockService).getStocks(any());
        verify(stockService, times(1)).getStocks(any());

    }


    @Test
    public void givenUserPortfolioIdToDeleteThenShouldReturnNotFoundMessage() throws Exception {
        when(stockService.deleteUserPortfolio(any())).thenReturn(false);
        mockMvc.perform(delete("/api/v1/userPortfolioInfo/nikhil@gmail.com/portfolio1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound()).andDo(MockMvcResultHandlers.print());
    }


    @Test
    public void givenUserPortfolioIdToDeleteThenShouldReturnAcceptedResponse() throws Exception {
        when(stockService.deleteUserPortfolio(any())).thenReturn(true);
        mockMvc.perform(delete("/api/v1/userPortfolioInfo/nikhil@gmail.com/portfolio1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isAccepted()).andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void givenBlogToUpdateThenShouldReturnAcceptedResponse() throws Exception {
        when(stockService.updateUserPortfolio(any())).thenReturn(true);
        mockMvc.perform(put("/api/v1/userPortfolioInfo/nikhil@gmail.com/portfolio1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(stockList1))
                        .characterEncoding("utf-8"))
                .andExpect(status().isAccepted()).andDo(MockMvcResultHandlers.print());
    }

    public static String asJsonString(final Object obj) {
        try {
            System.out.println("Voila");
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}