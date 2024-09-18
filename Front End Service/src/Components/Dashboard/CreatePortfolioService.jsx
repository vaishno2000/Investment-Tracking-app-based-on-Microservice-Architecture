import axios from "axios";

const API_URL = "http://localhost:9000/api/portfolios";

const getAllPortfoliosByUserId = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

const createPortfolio = (userId, portfolioData) => {
  return axios.post(`${API_URL}/create/${userId}`, portfolioData);
};

const deletePortfolio = (userId, portfolioId) => {
  return axios.delete(`${API_URL}/${userId}/${portfolioId}`);
};

const updatePortfolio = (userId, portfolioId, updatedData) => {
  return axios.put(`${API_URL}/${userId}/${portfolioId}`, updatedData);
};

const getPortfolioById = (userId, portfolioId) => {
  return axios.get(`${API_URL}/${userId}/${portfolioId}`);
};

export default {
  getAllPortfoliosByUserId,
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  getPortfolioById,
};
