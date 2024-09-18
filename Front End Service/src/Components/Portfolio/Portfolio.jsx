import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  faHandHoldingUsd,
  faSearch,
} from "@fortawesome/fontawesome-free-solid";
import { Form, InputGroup } from "react-bootstrap";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthProvider from "../../AuthProvider";
ChartJS.register(ArcElement, Tooltip, Legend);
function Portfolio() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [portfolioId, setPortfolioId] = useState(
    sessionStorage.getItem("portfolioId")
  );
  const [boxOpen, setBoxOpen] = React.useState(false);
  const [loadingBoxOpen, setLoadingBoxOpen] = useState(false);
  const [errorBoxOpen, setErrorBoxOpen] = useState(false);
  const [errorBox2Open, setErrorBox2Open] = useState(false);
  const [everythingLoaded, setEverythingLoaded] = useState(false);

  const [stockInfoForBox, setStockInfoForBox] = useState({
    symbol: "",
    name: "",
    quantity: 0,
  });
  const [search, setSearch] = useState("");
  fontawesome.library.add(faHandHoldingUsd, faSearch);
  const [cumulativeInfo, setcumulativeInfo] = useState({
    totalcap: 0,
    profitloss: 0,
    profitlossper: 0,
    originalcap: 0,
  });

  const [zeroStocks, setzeroStocks] = useState(false);
  const [newStocksList, setnewStocksList] = useState([
    {
      symbol: "S1",
      name: "Stock1",
    },
    {
      symbol: "S2",
      name: "Stock2",
    },
    {
      symbol: "S3",
      name: "Stock3",
    },
    {
      symbol: "S4",
      name: "Stock4",
    },
    {
      symbol: "S5",
      name: "Stock5",
    },
    {
      symbol: "S6",
      name: "Stock6",
    },
    {
      symbol: "S7",
      name: "Stock7",
    },
    {
      symbol: "S8",
      name: "Stock8",
    },
    {
      symbol: "S9",
      name: "Stock9",
    },
    {
      symbol: "S10",
      name: "Stock10",
    },
    {
      symbol: "S11",
      name: "Stock11",
    },
    {
      symbol: "S12",
      name: "Stock12",
    },
    {
      symbol: "S13",
      name: "Stock13",
    },
  ]);

  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:9000/api/v1/userPortfolioInfo/${userId}/${portfolioId}`
      )
      .then((res) => {
        setStocks(res.data);
        updateInfo(res.data);
        if (res.data.length == 0) {
          setzeroStocks(true);
        }
      })
      .catch((error) => {
        console.log("my error", error);
        setzeroStocks(true);
      });

    const fetchNewStocklist = async () => {
      const options = {
        method: "GET",
        url: "https://twelve-data1.p.rapidapi.com/stocks",
        params: {
          exchange: "NASDAQ",
          format: "json",
        },
        headers: {
          "X-RapidAPI-Key":
            "<Generate key from RapidAPI and add here>",
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setnewStocksList(response.data.data);
        console.log("once");
        setEverythingLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    // uncomment
    fetchNewStocklist();
  }, []);
  /*useEffect(()=>{
    updateInfo(stocks)
  }, [stocks])*/

  const [donutData, setDonutData] = useState({
    labels: ["dummy1"],
    datasets: [
      {
        label: "Stock Data",
        data: 1,
        backgroundColor: [
          "#0074D9",
          "#FF4136",
          "#2ECC40",
          "#FF851B",
          "#7FDBFF",
          "#B10DC9",
          "#FFDC00",
          "#001f3f",
          "#39CCCC",
          "#01FF70",
          "#85144b",
          "#F012BE",
          "#3D9970",
          "#111111",
          "#AAAAAA",
        ],
      },
    ],
  });
  const options = {};

  const handleAgree = () => {
    setBoxOpen(false);
    if (zeroStocks === true) {
      const newUser = {
        userPortfolioIdentity: {
          userId: userId,
          portfolioId: portfolioId,
        },
        stockList: [
          {
            symbol: stockInfoForBox.symbol,
            stockName: stockInfoForBox.name,
            quantity: 1,
            priceOfPurchase: stockInfoForBox.currentPrice,
            dateOfPurchase: "",
          },
        ],
      };
      const newTransaction = {
        symbol: stockInfoForBox.symbol,
        stockName: stockInfoForBox.name,
        quantity: 1,
        priceOfStock: stockInfoForBox.currentPrice,
        dateOfPurchase: "",
        transactionType: "BUY",
      };
      axios
        .post(`http://localhost:9000/api/v1/userPortfolioInfo`, newUser)
        .then((res) => {
          console.log(res.data);
        });
      axios
        .post(
          `http://localhost:9000/api/transactions/create/${userId}`,
          newTransaction
        )
        .then((res) => {
          console.log(res.data);
        });
      setzeroStocks(false);

      const newStock = {
        symbol: stockInfoForBox.symbol,
        stockName: stockInfoForBox.name,
        quantity: 1,
        priceOfPurchase: stockInfoForBox.currentPrice,
        dateOfPurchase: "",
      };
      setStocks([newStock]);
      updateInfo([newStock]);
    } else {
      const newStock = {
        symbol: stockInfoForBox.symbol,
        stockName: stockInfoForBox.name,
        quantity: 1,
        priceOfPurchase: stockInfoForBox.currentPrice,
        dateOfPurchase: "",
      };
      const newTransaction = {
        symbol: stockInfoForBox.symbol,
        stockName: stockInfoForBox.name,
        quantity: 1,
        priceOfStock: stockInfoForBox.currentPrice,
        dateOfPurchase: "",
        transactionType: "BUY",
      };
      var check = true;
      const requests = stocks.map((stock) => {
        if (stock.symbol === stockInfoForBox.symbol) {
          check = false;
        }
      });

      return Promise.all(requests).then(() => {
        if (check) {
          const updatedStocks = [...stocks, newStock];
          setStocks(updatedStocks);
          updateInfo(updatedStocks);
          axios
            .put(
              `http://localhost:9000/api/v1/userPortfolioInfo/${userId}/${portfolioId}`,
              updatedStocks
            )
            .then((res) => {
              console.log(res.data);
            });
          axios
            .post(
              `http://localhost:9000/api/transactions/create/${userId}`,
              newTransaction
            )
            .then((res) => {
              console.log(res.data);
            });
        } else {
          console.log("Already added this stock");
          setErrorBox2Open(true);
        }
      });
    }
  };

  const handleDisagree = () => {
    setBoxOpen(false);
    setErrorBoxOpen(false);
    setErrorBox2Open(false);
    setLoadingBoxOpen(false);
  };

  const updateInfo = (stockList) => {
    setDonutData({
      labels: stockList.map((stock) => stock.stockName),
      datasets: [
        {
          label: "Stock Data",
          data: stockList.map((stock) => {
            return stock.quantity * stock.priceOfPurchase;
          }),
          backgroundColor: [
            "#0074D9",
            "#FF4136",
            "#2ECC40",
            "#FF851B",
            "#7FDBFF",
            "#B10DC9",
            "#FFDC00",
            "#001f3f",
            "#39CCCC",
            "#01FF70",
            "#85144b",
            "#F012BE",
            "#3D9970",
            "#111111",
            "#AAAAAA",
          ],
        },
      ],
    });
    var totalcap = 0;
    stockList.map((stock) => {
      totalcap += stock.quantity * stock.priceOfPurchase;
    });
    setcumulativeInfo({
      totalcap: totalcap,
      profitloss: Math.min(976, totalcap),
      profitlossper: /* Math.trunc(976 * 100 / totalcap) */ stockList.length,
      originalcap: /* Math.max(totalcap - 976, 0) */ totalcap,
    });
  };

  const buyStockClick = (stockid) => {
    const newTransaction = {
      symbol: "",
      stockName: "",
      quantity: 1,
      priceOfStock: "",
      dateOfPurchase: "",
      transactionType: "BUY",
    };
    const updatedStocks = stocks.map((stock) => {
      if (stock.symbol === stockid) {
        stock.quantity++;
        newTransaction["symbol"] = stockid;
        newTransaction["stockName"] = stock.stockName;
        newTransaction["priceOfStock"] = stock.priceOfPurchase;
      }
      return stock;
    });
    setStocks(updatedStocks);
    updateInfo(updatedStocks);
    axios
      .put(
        `http://localhost:9000/api/v1/userPortfolioInfo/${userId}/${portfolioId}`,
        updatedStocks
      )
      .then((res) => {
        console.log(res.data);
      });
    axios
      .post(
        `http://localhost:9000/api/transactions/create/${userId}`,
        newTransaction
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  function sellStockClick(stockid) {
    const newTransaction = {
      symbol: "",
      stockName: "",
      quantity: 1,
      priceOfStock: "",
      dateOfPurchase: "",
      transactionType: "SELL",
    };
    const updatedStocks = stocks.filter((stock) => {
      if (stock.symbol === stockid) {
        stock.quantity--;
        newTransaction["symbol"] = stockid;
        newTransaction["stockName"] = stock.stockName;
        newTransaction["priceOfStock"] = stock.priceOfPurchase;
      }
      if (stock.quantity > 0) {
        return stock;
      }
    });
    if (updatedStocks.length == 0) {
      setzeroStocks(true);
    }
    console.log(updatedStocks);
    setStocks(updatedStocks);
    updateInfo(updatedStocks);

    axios
      .put(
        `http://localhost:9000/api/v1/userPortfolioInfo/${userId}/${portfolioId}`,
        updatedStocks
      )
      .then((res) => {
        console.log(res.data);
      });
    axios
      .post(
        `http://localhost:9000/api/transactions/create/${userId}`,
        newTransaction
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  const addStockClick = async (stocksymbol, stockName) => {
    const fetchCurrentStockPrice = async () => {
      setLoadingBoxOpen(true);

      const options = {
        method: "GET",
        url: `https://realstonks.p.rapidapi.com/${stocksymbol}`,
        headers: {
          "X-RapidAPI-Key":
            "<Generate key from RapidAPI and add here>",
          "X-RapidAPI-Host": "realstonks.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("voila",response.data);
        setStockInfoForBox({
          symbol: stocksymbol,
          name: stockName,
          currentPrice: response.data.price,
        });
        setBoxOpen(true);
        setLoadingBoxOpen(false);
      } catch (error) {
        console.error(error);
        setErrorBoxOpen(true);
        setLoadingBoxOpen(false);
      }
    };

    //uncomment
    fetchCurrentStockPrice();
  };

  return (
    <div>
      <div className="curated">
        <div className="row text-center">
          <div className="col col-md-7 totalcap">
            <h1 className="totalcapval">
              ${cumulativeInfo["totalcap"].toFixed(2)}
            </h1>
            <p className="totalcaptag">Total Cap</p>
          </div>
          {/* <div className="col col-md-2 profitloss">
            <h1 className='profitlossval'>${cumulativeInfo["profitloss"]}</h1>
            <p className='profitlosstag'>Profit</p>
          </div>
          <div className="col col-md-2 profitlossper">
            <h1 className='profitlossperval'>{cumulativeInfo["profitlossper"]}%</h1>
            <p className='profitlosspertag'>Percent</p>
          </div> */}

          <div className="col col-md-2 profitlossper">
            <h1 className="profitlossperval">
              {cumulativeInfo["profitlossper"]}
            </h1>
            <p className="profitlosspertag">Number of Different Stocks owned</p>
          </div>

          <div className="col col-md-2 originalcap">
            <h1 className="originalcapval">
              ${cumulativeInfo["originalcap"].toFixed(2)}
            </h1>
            <p className="originalcaptag">Original Capital</p>
          </div>
        </div>
      </div>

      {zeroStocks ? (
        <div>
          <h1 className="text-center fallback">
            <FontAwesomeIcon icon="hand-holding-usd" className=" fa-3x" />{" "}
            <br />
            Welcome Investor,
            <br />
            Please add new stocks to access your analytics dashboard and many
            more features.
          </h1>
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="col-md-7 d-flex justify-content-center">
              <div style={{ height: "400px", marginTop: "60px" }}>
                <Doughnut
                  options={options}
                  data={donutData}
                  style={{ height: "100%" }}
                />
              </div>
            </div>
            <div
              className="col-md-5 d-flex justify-content-center"
              style={{ height: "400px", marginTop: "100px" }}
            >
              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th colSpan="2">
                        <h1 className="toph">Stocks Splitup</h1>
                      </th>
                    </tr>
                  </thead>
                  <thead className="mine">
                    <tr className="mine">
                      <th scope="col">Stock</th>
                      <th scope="col" className="wid">
                        Capital Allocated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => (
                      <tr key={stock.symbol}>
                        <th scope="row">{stock.symbol}</th>
                        <td>
                          ${(stock.priceOfPurchase * stock.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <section className="stocktable">
            <h1 className="table-header">Stocks Purchased By Me</h1>
            <div className="tbl-header">
              <table
                className="stock-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <thead>
                  <tr>
                    <th className="stock-th">Symbol</th>
                    <th className="stock-th">Stock Name</th>
                    <th className="stock-th">Price of Purchase</th>
                    <th className="stock-th">Quantity</th>
                    <th className="stock-th" colSpan={2}>
                      Buy/Sell Stocks
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table
                className="stock-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.symbol}>
                      <td className="stock-td">{stock.symbol}</td>
                      <td className="stock-td">{stock.stockName}</td>
                      <td className="stock-td">${stock.priceOfPurchase}</td>
                      <td className="stock-td">{stock.quantity}</td>
                      <td className="stock-td">
                        <button
                          className="btn btn-success"
                          onClick={(e) => buyStockClick(stock.symbol)}
                        >
                          Buy
                        </button>
                      </td>
                      <td className="stock-td">
                        <button
                          className="btn btn-danger"
                          onClick={(e) => sellStockClick(stock.symbol)}
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      <section className="newstocktable">
        <h1 className="table-header">Add New Stocks</h1>
        {/* <Form className='d-flex justify-content-center'>
          
        <FontAwesomeIcon icon="search" className='fa-2x' />
                <InputGroup className='input-form'>
                  <Form.Control 
                  onChange={(e)=> setSearch(e.target.value)}
                  placeholder='Search by stock name'
                  />
                </InputGroup>
              </Form> */}
        <div className="tbl-header">
          <table
            className="stock-table"
            cellPadding="0"
            cellSpacing="0"
            border="0"
          >
            <thead>
              <tr>
                <th className="stock-th">Symbol</th>
                <th className="stock-th">Stock Name</th>
                <th className="stock-th">Add Stock</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          {everythingLoaded ? (
            <table
              className="stock-table"
              cellPadding="0"
              cellSpacing="0"
              border="0"
            >
              <tbody>
                {
                  /*  newStocksList.filter((item)=>{
                  return search.toLowerCase===''?item
                  :(item.symbol.toLowerCase().includes(search))
                }) */
                  newStocksList.map((stock) => (
                    <tr key={stock.symbol}>
                      <td className="stock-td">{stock.symbol}</td>
                      <td className="stock-td">{stock.name}</td>
                      <td className="stock-td">
                        <button
                          className="btn btn-success"
                          onClick={(e) =>
                            addStockClick(stock.symbol, stock.name)
                          }
                        >
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <h1 className="h1-td">Loading...</h1>
          )}
        </div>
      </section>

      <Dialog
        open={boxOpen}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please review your choice:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The current price of the selected stock is: $
            {stockInfoForBox.currentPrice}
            <br />
            Are sure you want to purchase the stock of: {stockInfoForBox.symbol}
            -{stockInfoForBox.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={loadingBoxOpen}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Loading Please Wait...
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={errorBoxOpen}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sorry stock info was not found by API"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The API was not able to recognise this stock. Please select some
            other stock.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorBox2Open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sorry, but this stock is already present in your portfolio"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to increase the number of shares for this stock. Please
            do so from the "Stocks Purchased By Me" tab.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AuthProvider(Portfolio);
