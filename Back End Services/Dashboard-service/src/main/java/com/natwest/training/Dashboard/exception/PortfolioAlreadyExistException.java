package com.natwest.training.Dashboard.exception;

public class PortfolioAlreadyExistException extends RuntimeException {

    public PortfolioAlreadyExistException(String message) {
        super(message);
    }
}
