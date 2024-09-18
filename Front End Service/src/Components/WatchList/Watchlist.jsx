import React, { useState, useEffect } from "react";
import StockTableBody from "./StockTableBody";
import "./Watchlist.css";
import StockSearch from "./StockSearch";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthProvider from "../../AuthProvider";

const Watchlist = () => {
  const [userId, setUserId] = useState(null);
  const [stock, setStock] = useState([]);
  const [stockAdded, setStockAdded] = useState(false);

  const handleStockSelection = (selectedSymbol, selectedName) => {
    const newStockItem = {
      userId,
      symbol: selectedSymbol,
      name: selectedName,
    };

    axios
      .post(`http://localhost:9000/watchlist/add/${userId}`, newStockItem)
      .then((response) => {
        setStock((prevStock) => [...prevStock, response.data]);
        setStockAdded(true);
      })
      .catch((error) => {
        console.error("Error adding stock:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/watchlist/stocks/${userId}`)
      .then((response) => {
        const responseData = response.data;
        // console.log(responseData);
        if (Array.isArray(responseData)) {
          setStock(responseData);
        } else {
          setStock([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (stockAdded) {
      window.location.reload();
    }
  }, [stockAdded]);

  return (
    <div className="watchlistbody">
      <div className="watchlistheader text-center">
        <h1 className="white-text">WATCHLIST</h1>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <p className="p white-text">ADD SYMBOL TO ADD TO WATCHLIST</p>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <StockSearch onStockSelect={handleStockSelection} />
            </div>
            <div className="col"></div>
            <div className="col">
              <button className="btn wbtn ">
                <Link className="nav-link active" to="/esgrating">
                  ESG RATING
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="tablebody">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SYMBOL</th>
              <th scope="col">NAME</th>
              <th scope="col">PRICE</th>
              <th scope="col">CHANGE POINT</th>
              <th scope="col">CHANGE PERCENT</th>
              <th scope="col">TOTAL VOLUME</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {stock.length > 0 ? (
            stock.map((item) => {
              return (
                <StockTableBody
                  userId={userId}
                  key={item.symbol}
                  symbol={item.symbol}
                  name={item.name}
                />
              );
            })
          ) : (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center align-middle">
                  No Stocks in Watchlist Currently
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AuthProvider(Watchlist);
