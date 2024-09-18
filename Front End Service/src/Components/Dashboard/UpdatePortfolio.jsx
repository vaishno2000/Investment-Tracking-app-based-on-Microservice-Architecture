import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CreatePortfolioService from './CreatePortfolioService';

function UpdatePortfolio() {
  const [userId] = useState(sessionStorage.getItem("userId"));
  const [portfolioId] = useState(sessionStorage.getItem("portfolioId"));
  const navigate = useNavigate();

  const initialFormState = {
    portfolioName: '',
    investmentType: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    // Fetch the existing portfolio data and populate the form
    CreatePortfolioService.getPortfolioById(userId, portfolioId)
      .then((response) => {
        const portfolioData = response.data;

        setFormData({
          portfolioName: portfolioData.portfolioName || '',
          investmentType: portfolioData.investmentType || '',
          description: portfolioData.description || '',
        });
      })
      .catch((error) => {
        console.error('Error fetching portfolio:', error);
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

    // Make an API call to update the portfolio
    CreatePortfolioService.updatePortfolio(userId, portfolioId, updatedPortfolio)
      .then((response) => {
        console.log('Portfolio updated successfully', response.data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error updating portfolio:', error);
      });
  };

  return (
    <div className="container mt-4" style={{ background: 'lavender' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ background: 'rgb(67, 5, 78)' }}>
            <div className="card-body">
              <h2 className="card-title" style={{ color: 'white' }}>Update Portfolio</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="portfolioName" className="form-label" style={{ color: 'white' }}>Portfolio Name</label>
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
                {/* Add fields for other portfolio information here */}
                <div className="mb-3">
                  <label htmlFor="investmentType" className="form-label" style={{ color: 'white' }}>Investment Type</label>
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
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" style={{ color: 'white' }}>Description</label>
                  <textarea
                    className="form-control form-control-lg"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-secondary btn-lg">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePortfolio;
