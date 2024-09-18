import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreatePortfolioService from "./CreatePortfolioService";
import AuthProvider from "../../AuthProvider";

function CreatePortfolio() {
  const [userId] = useState(sessionStorage.getItem("userId"));
  const navigate = useNavigate();

  const initialFormState = {
    portfolioName: "",
    investmentType: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const portfolioAction = CreatePortfolioService.createPortfolio(
      userId,
      formData
    );

    portfolioAction
      .then((response) => {
        console.log("Portfolio created:", response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error creating portfolio:", error);
      });
  };

  return (
    <div
      className="container"
      style={{ background: "lavender", height: "91vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-3" style={{ background: "rgb(74, 18, 105)" }}>
            <div className="card-body">
              <h2 className="card-title" style={{ color: "white" }}>
                {"Create Portfolio"}
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
                  {"Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthProvider(CreatePortfolio);
