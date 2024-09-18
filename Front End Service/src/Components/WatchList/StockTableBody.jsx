import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePortfolioService from "../Dashboard/CreatePortfolioService";
import { useNavigate } from "react-router-dom";

const StockTableBody = (props) => {
  const [stockDetails, setStockDetails] = useState();
  //change this later
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedStock, setDeletedStock] = useState(false);
  const [userId] = useState(sessionStorage.getItem("userId"));
  const [portfolios, setPortfolios] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const navigate = useNavigate();

  console.log(userId);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePortfolioSelect = (portfolioId) => {
    setSelectedPortfolio(portfolioId);
    sessionStorage.setItem("portfolioId", portfolioId);
    setShowDropdown(false);
    navigate("/portfolio");
  };

  useEffect(() => {
    CreatePortfolioService.getAllPortfoliosByUserId(userId)
      .then((response) => {
        // console.log(response.data);
        setPortfolios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching portfolios:", error);
      });
  }, [userId]);

  // uncomment
  useEffect(() => {
    const fetchData = async () => {
      const baseURL = "https://realstonks.p.rapidapi.com";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "<Generate key from RapidAPI and add here>",
          "X-RapidAPI-Host": "realstonks.p.rapidapi.com",
        },
      };
      const url = `${baseURL}/${props.symbol}`;
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setStockDetails(data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [props.symbol]);

  const handleRemoveClick = () => {
    // console.log("entered");
    const removalData = {
      symbol: props.symbol,
      name: props.name,
    };

    axios
      .delete(`http://localhost:9000/watchlist/stocks/delete/${props.userId}`, {
        data: removalData,
      })
      .then((response) => {
        setDeletedStock(true);
        console.log("Stock removed successfully");
      })
      .catch((error) => {
        console.error("Error removing stock:", error);
      });
  };

  useEffect(() => {
    if (deletedStock) {
      window.location.reload();
    }
  }, [deletedStock]);

  return (
    <tbody>
      {loading ? (
        <tr>
          <td colSpan="7" className="text-center align-middle">
            Loading...
          </td>
        </tr>
      ) : error ? (
        <tr>
          <td colSpan="7" className="text-center align-middle">
            {error}
          </td>
        </tr>
      ) : stockDetails && typeof stockDetails === "object" ? (
        <tr>
          <th scope="row">{props.symbol}</th>
          <td>{props.name}</td>
          <td>
            <b>${stockDetails.price}</b>
          </td>
          <td
            className={
              stockDetails.change_point < 0 ? "text-danger" : "text-success"
            }
          >
            {stockDetails.change_point}
          </td>
          <td
            className={
              stockDetails.change_percentage < 0
                ? "text-danger"
                : "text-success"
            }
          >
            {stockDetails.change_percentage}%
          </td>
          <td>{stockDetails.total_vol}</td>
          <td style={{ padding: "0" }}>
            <button
              className="btn dropdown-toggle"
              onClick={handleDropdownToggle}
            >
              <i
                className="fa fa-plus-circle fa-lg"
                aria-hidden="true"
                style={{ color: "green", verticalAlign: "middle" }}
              ></i>
            </button>
            {portfolios.length > 0 ? (
              <ul
                className={`dropdown-menu scrollable-dropdown ${
                  showDropdown ? "show" : ""
                }`}
              >
                {portfolios.map((portfolio) => (
                  <li key={portfolio.portfolioId}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        handlePortfolioSelect(portfolio.portfolioId)
                      }
                    >
                      {portfolio.portfolioName}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ul
                className={`dropdown-menu scrollable-dropdown ${
                  showDropdown ? "show" : ""
                }`}
              >
                <li>No Portfolios Currently</li>
              </ul>
            )}
            <button
              className="btn"
              style={{ padding: "3px" }}
              onClick={handleRemoveClick}
            >
              <i
                className="fa fa-minus-circle fa-lg"
                aria-hidden="true"
                style={{ color: "red" }}
              ></i>
            </button>
          </td>
        </tr>
      ) : null}
    </tbody>
  );
};

export default StockTableBody;
