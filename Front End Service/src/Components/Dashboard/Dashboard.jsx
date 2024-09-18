import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreatePortfolioService from "./CreatePortfolioService";
import AuthProvider from "../../AuthProvider";

function Dashboard() {
  const [userId] = useState(sessionStorage.getItem("userId"));
  const [knowledgeModules] = useState([
    {
      id: 1,
      moduleNo: 1,
      moduleTitle: "Introduction to ESG",
      imageUrl: "IntroductionToESG.jpg",
    },
    {
      id: 2,
      moduleNo: 2,
      moduleTitle: "Evolution of ESG",
      imageUrl: "ESGEvolution.png",
    },
    {
      id: 3,
      moduleNo: 3,
      moduleTitle: "Disclosure&Regulations",
      imageUrl: "DisclosureRegulations.jpg",
    },
    {
      id: 4,
      moduleNo: 4,
      moduleTitle: "Educating Businesses",
      imageUrl: "EducatingWithESG.jpg",
    },
    {
      id: 5,
      moduleNo: 5,
      moduleTitle: "Alternatives of ESG",
      imageUrl: "AlternativesOfESG.webp",
    },
  ]);

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CreatePortfolioService.getAllPortfoliosByUserId(userId)
      .then((response) => {
        // console.log(response.data);
        setPortfolios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolios:", error);
        setLoading(false);
      });
  }, [userId]);

  const savePortfolioID = (id) => {
    console.log("Saving portfolio ID:", id);
    sessionStorage.setItem("portfolioId", id);
  };

  const handleDeletePortfolio = (portfolioId) => {
    // Call the deletePortfolio function
    CreatePortfolioService.deletePortfolio(userId, portfolioId)
      .then(() => {
        // Remove the deleted portfolio from the state
        setPortfolios((prevPortfolios) =>
          prevPortfolios.filter(
            (portfolio) => portfolio.portfolioId !== portfolioId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting portfolio:", error);
      });
  };

  return (
    <div
      className="container"
      style={{ background: "lavender", minHeight: "91vh" }}
    >
      <div className="row">
        {/* Knowledge Modules */}
        <div className="col-md-12 mb-3 mt-4">
          <div className="d-flex justify-content-between align-items-center">
            {knowledgeModules.map((module) => (
              <div
                className="card mx-2"
                key={module.id}
                style={{ width: "18rem" }}
              >
                <img
                  src={module.imageUrl}
                  className="card-img-top"
                  alt={`Module ${module.moduleNo}`}
                />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">
                    Module No: {module.moduleNo}
                  </h5>
                  <p className="card-text">{module.moduleTitle}</p>
                  <Link to={`/knowledgecentre`} className="btn" style={{ backgroundColor: "#5A287D", color: "white" }}>
                    Start Module
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Card */}
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="card" style={{ background: "rgb(74, 18, 105)" }}>
              <div className="card-body">
                <h5 className="card-title text-white">
                  Welcome to Investment Tracker!
                </h5>
                <p className="card-text text-white">
                  Get started by creating your investment portfolio.
                </p>
                <div className="d-flex">
                  <Link
                    to="/create-portfolio"
                    className="btn btn-light mx-2"
                  >
                    Create Portfolio
                  </Link>
                  <Link to="/edit-profile" className="btn btn-light mx-2">
                    Profile Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Cards */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="col-md-12">
            <div className="row">
              {Array.isArray(portfolios) && portfolios.length > 0 ? (
                portfolios.map((portfolio) => (
                  <div className="col-md-4 mb-3" key={portfolio.portfolioId}>
                    <div className="card">
                      <div
                        className="card-body"
                        // style={{ backgroundColor: "#F38CFD" }}
                      >
                        <h5 className="card-title">
                          Portfolio ID: {portfolio.portfolioId}
                        </h5>
                        <p className="card-text">
                          Portfolio Name: {portfolio.portfolioName}
                        </p>
                        <p className="card-text">
                          Description: {portfolio.description}
                        </p>
                        <Link
                          to={"/portfolio"}
                          className="btn"
                          style={{ backgroundColor: "#5A287D", color: "white" }}
                          onClick={(e) => {
                            // e.preventDefault();
                            savePortfolioID(portfolio.portfolioId);
                          }}
                        >
                          View Portfolio
                        </Link>
                        <button
                          onClick={() =>
                            handleDeletePortfolio(portfolio.portfolioId)
                          }
                          className="btn btn-danger mx-2"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/edit-portfolio/${userId}/${portfolio.portfolioId}`}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No portfolios to display.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthProvider(Dashboard);
