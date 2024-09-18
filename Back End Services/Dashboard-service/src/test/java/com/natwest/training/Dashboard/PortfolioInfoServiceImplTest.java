package com.natwest.training.Dashboard;

import com.natwest.training.Dashboard.model.Portfolio;
import com.natwest.training.Dashboard.model.PortfolioInfo;
import com.natwest.training.Dashboard.repository.PortfolioInfoRepository;
import com.natwest.training.Dashboard.service.PortfolioInfoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PortfolioInfoServiceImplTest {

    @InjectMocks
    private PortfolioInfoServiceImpl portfolioInfoService;

    @Mock
    private PortfolioInfoRepository portfolioInfoRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreatePortfolio() {
        // Arrange
        String userId = "user123";
        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioId("portfolio123");

        List<Portfolio> portfolios = new ArrayList<>();

        when(portfolioInfoRepository.findById(userId)).thenReturn(Optional.empty());
        when(portfolioInfoRepository.save(any(PortfolioInfo.class))).thenAnswer(invocation -> invocation.getArguments()[0]);

        // Act
        PortfolioInfo createdPortfolioInfo = portfolioInfoService.createPortfolio(userId, portfolio);

        // Assert
        assertNotNull(createdPortfolioInfo);
        assertEquals(1, createdPortfolioInfo.getPortfolios().size()); // Expecting 1, as a new portfolio is created
    }


    @Test
    public void testGetAllPortfoliosByUserId() {
        String userId = "user123";
        List<Portfolio> portfolios = new ArrayList<>();

        PortfolioInfo portfolioInfo = new PortfolioInfo();
        portfolioInfo.setUserId(userId);
        portfolioInfo.setPortfolios(portfolios);

        when(portfolioInfoRepository.findById(userId)).thenReturn(Optional.of(portfolioInfo));

        List<Portfolio> retrievedPortfolios = portfolioInfoService.getAllPortfoliosByUserId(userId);

        assertNotNull(retrievedPortfolios);
        assertEquals(portfolios, retrievedPortfolios);

        verify(portfolioInfoRepository, times(1)).findById(userId);
    }

    @Test
    public void testGetPortfolioByPortfolioId() {
        String userId = "user123";
        String portfolioId = "portfolio123";

        Portfolio portfolio = new Portfolio();
        portfolio.setPortfolioId(portfolioId);

        PortfolioInfo portfolioInfo = new PortfolioInfo();
        portfolioInfo.setUserId(userId);
        portfolioInfo.setPortfolios(List.of(portfolio));

        when(portfolioInfoRepository.findById(userId)).thenReturn(Optional.of(portfolioInfo));

        PortfolioInfo retrievedPortfolioInfo = portfolioInfoService.getPortfolioByPortfolioId(userId, portfolioId);

        assertNotNull(retrievedPortfolioInfo);
        assertEquals(userId, retrievedPortfolioInfo.getUserId());
        assertEquals(1, retrievedPortfolioInfo.getPortfolios().size());
        assertEquals(portfolio, retrievedPortfolioInfo.getPortfolios().get(0));

        verify(portfolioInfoRepository, times(1)).findById(userId);
    }

    @Test
    public void testUpdatePortfolio() {
        String userId = "user123";
        String portfolioId = "portfolio123";

        Portfolio existingPortfolio = new Portfolio();
        existingPortfolio.setPortfolioId(portfolioId);
        existingPortfolio.setPortfolioName("Old Name");
        existingPortfolio.setInvestmentType("Old Type");
        existingPortfolio.setDescription("Old Description");

        Portfolio updatedPortfolio = new Portfolio();
        updatedPortfolio.setPortfolioName("New Name");
        updatedPortfolio.setInvestmentType("New Type");
        updatedPortfolio.setDescription("New Description");

        PortfolioInfo portfolioInfo = new PortfolioInfo();
        portfolioInfo.setUserId(userId);
        portfolioInfo.setPortfolios(List.of(existingPortfolio));

        when(portfolioInfoRepository.findById(userId)).thenReturn(Optional.of(portfolioInfo));
        when(portfolioInfoRepository.save(portfolioInfo)).thenReturn(portfolioInfo);

        PortfolioInfo updatedPortfolioInfo = portfolioInfoService.updatePortfolio(userId, portfolioId, updatedPortfolio);

        assertNotNull(updatedPortfolioInfo);
        assertEquals(userId, updatedPortfolioInfo.getUserId());
        assertEquals(1, updatedPortfolioInfo.getPortfolios().size());

        Portfolio updatedPortfolioFromInfo = updatedPortfolioInfo.getPortfolios().get(0);
        assertEquals(portfolioId, updatedPortfolioFromInfo.getPortfolioId());
        assertEquals("New Name", updatedPortfolioFromInfo.getPortfolioName());
        assertEquals("New Type", updatedPortfolioFromInfo.getInvestmentType());
        assertEquals("New Description", updatedPortfolioFromInfo.getDescription());

        verify(portfolioInfoRepository, times(1)).findById(userId);
        verify(portfolioInfoRepository, times(1)).save(portfolioInfo);
    }

    @Test
    public void testDeletePortfolio() {
            // Arrange
            String userId = "user123";
            String portfolioId = "portfolio456";

            Portfolio portfolio = new Portfolio();
            portfolio.setPortfolioId(portfolioId);

            List<Portfolio> portfolios = new ArrayList<>();
            portfolios.add(portfolio);

            PortfolioInfo portfolioInfo = new PortfolioInfo(userId, portfolios);

            when(portfolioInfoRepository.findById(userId)).thenReturn(Optional.of(portfolioInfo));
            when(portfolioInfoRepository.save(any(PortfolioInfo.class))).thenAnswer(invocation -> invocation.getArguments()[0]);

        boolean result = portfolioInfoService.deletePortfolio(userId, portfolioId);

        // Assert
        assertTrue(result);
        assertEquals(0, portfolioInfo.getPortfolios().size());
        verify(portfolioInfoRepository, times(1)).findById(userId);
        verify(portfolioInfoRepository, times(1)).save(any(PortfolioInfo.class));
    }
}
