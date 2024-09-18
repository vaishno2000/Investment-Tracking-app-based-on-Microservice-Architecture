import React from "react";
import axios from "axios";

const apiUrl = "http://localhost:9000/api/users";

const getAllUsers = () => {
  return axios.get(apiUrl);
};
const getUserById = (userId) => {
    return axios.get(`${apiUrl}/${userId}`);
}
const getUserByEmailId=(emailId)=>{
    return axios.get(`${apiUrl}/email/${emailId}`);
}

const registerUser = (user) => {
  console.log(user);
  return axios.post(apiUrl, user);
};
const updateUser = (userId, user) => {
  console.log(user);
  return axios.put(`${apiUrl}/${userId}`, user);
};
const deleteUser = (userId) => {
  return axios.delete(`${apiUrl}/${userId}`);
};
const loginUser = (user) => {
  console.log(user);
  return axios.post(`${apiUrl}/login`, user);
};
const logoutUser = () => {
  return axios.get(`${apiUrl}/logout`);
};
export default {
    getAllUsers,
    registerUser,
    deleteUser,
    getUserById,
    updateUser,
    loginUser,
    logoutUser,
    getUserByEmailId
}