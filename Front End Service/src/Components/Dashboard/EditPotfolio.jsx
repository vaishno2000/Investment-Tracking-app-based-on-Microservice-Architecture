import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreatePortfolioService from './CreatePortfolioService';
import AuthProvider from "../../AuthProvider";

function EditPortfolio() {
  const { userId, portfolioId } = useParams();
  console.log(userId + "  " + portfolioId);
  const navigate = useNavigate();

  const initialFormState = {
    portfolioName: "",
    investmentType: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    console.log("Fetching data from the API...");
    CreatePortfolioService.getPortfolioById(userId, portfolioId)
      .then((response) => {
        const portfolioData = response.data;
        console.log(
          "Received portfolio data:",
          portfolioData.portfolios[0].portfolioName
        );
        setFormData({
          portfolioName: portfolioData.portfolios[0].portfolioName || "",
          investmentType: portfolioData.portfolios[0].investmentType || "",
          description: portfolioData.portfolios[0].description || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching portfolio:", error);
      });
  }, [userId, portfolioId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPortfolio = {
      portfolioName: formData.portfolioName,
      investmentType: formData.investmentType,
      description: formData.description,
    };

    CreatePortfolioService.updatePortfolio(
      userId,
      portfolioId,
      updatedPortfolio
    )
      .then((response) => {
        console.log("Portfolio updated successfully", response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating portfolio:", error);
      });
  };

  return (
    <div className="container mt-4" style={{ background: "lavender" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ background: "rgb(67, 5, 78)" }}>
            <div className="card-body">
              <h2 className="card-title" style={{ color: "white" }}>
                Edit Portfolio
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="portfolioName"
                    className="form-label"
                    style={{ color: "white" }}
                  >
                    Portfolio Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="portfolioName"
                    name="portfolioName"
                    value={formData.portfolioName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="investmentType"
                    className="form-label"
                    style={{ color: "white" }}
                  >
                    Investment Type
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="investmentType"
                    name="investmentType"
                    value={formData.investmentType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Ethical">Ethical</option>
                    <option value="Green">Green</option>
                    <option value="Community">Community</option>
                    <option value="Mission-Related">Mission-Related</option>
                    <option value="Responsible">Responsible</option>
                    <option value="Impact">Impact</option>
                    <option value="Socially-Responsible">
                      Socially-Responsible
                    </option>
                    <option value="Value-Based">Value-Based</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label"
                    style={{ color: "white" }}
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-secondary btn-lg">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthProvider( EditPortfolio);
