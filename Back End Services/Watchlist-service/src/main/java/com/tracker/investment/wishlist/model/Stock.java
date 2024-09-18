package com.tracker.investment.wishlist.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class Stock {
    String symbol;
    String name;
    public Stock(){
        super();
    }

    public Stock(String symbol, String name) {
        super();
        this.symbol = symbol;
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getName() {
        return name;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Stock stock = (Stock) o;
        return Objects.equals(symbol, stock.symbol) && Objects.equals(name, stock.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(symbol, name);
    }

}
