import React, { useState, useEffect} from "react";
import "./Profile.css";
import { Table } from "react-bootstrap";
import './UserService.jsx'
import UserService from "./UserService.jsx";
import AuthProvider from "../../AuthProvider";
import { async } from "q";
import axios from "axios";


const Profile = () => {
  const userId=sessionStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    email: '',
    mobileNumber: '',
    password: '',
  });
  
  const [transactions, setTransactions] = useState([
    /*{
      id: 1,
      date: "2023-09-15",
      name: "XYZ Corp",
      description: "Stock purchase - XYZ Corp",
      amount: 1000,
    },
    {
      id: 2,
      date: "2023-09-14",
      name: "ABC Inc",
      description: "Dividend received - ABC Inc",
      amount: 500,
    },
    {
      id: 3,
      date: "2023-09-14",
      name: "ABC Inc",
      description: "Dividend received - ABC Inc",
      amount: 500,
    },
    {
      id: 4,
      date: "2023-09-14",
      name: "ABC Inc",
      description: "Dividend received - ABC Inc",
      amount: 500,
    },
    {
      id: 5,
      date: "2023-09-14",
      name: "ABC Inc",
      description: "Dividend received - ABC Inc",
      amount: 500,
    }*/
  ]);
  useEffect(()=>{
    /*const fetchTransactions=async()=>{
      try{
        const response=await TransactionsService.getTransactions(userId);
        const data=response.data;
        setTransactions(data);
      } catch (error){
        console.log("Error fetching Transaction Data");
      }
    }*/
    axios
      .get(
        `http://localhost:8086/api/transactions/${userId}`
      )
      .then((res) => {
        if(res.data.length>0){
        setTransactions(res.data);}
      })
      .catch((error) => {
        console.log("my error", error);
      });
  },[])
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserService.getUserById(userId);
        const userData = response.data; // Assuming the user data is in response.data
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Fetch user data when the component mounts
  }, [userId]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEditClick = () => {
    // Toggle editing mode
    setIsEditing(!isEditing);
    console.log("switched to save mode");
  };

  const handleSaveChangesClick = async () => {
    try {
      // Update user data on the backend
      UserService.updateUser(userId, userInfo);
      setIsEditing(false);
      console.log("changes saved and switched to edit mode");
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error, show a message to the user, or navigate to an error page
    }
  };

  return (
    <div id="profileContainer" className="edit-profile pt-5 pb-2">
      <h2>Edit Profile</h2>
      <div
        id="profile-form"
        className="mx-auto col-lg-4 px-5 py-5 justify-content-center align-items-center"
      >
        <form onSubmit={handleSubmit}>
          <div className="row">
          <div className="col-md-6 mb-1 ">
          <div className="form-group">
            <label className="text-white fs-5">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleInputChange}
              className="form-control"
              disabled={!isEditing}
            />
          </div>
        </div>
            <div className="col-md-6 mb-1 ">
              <div className="form-group">
                <label className="text-white fs-5">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="text-white fs-5">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              disabled={!isEditing}
              value={userInfo.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="text-white fs-5">Email:</label>
            <input
              type="email"
              name="emailId"
              value={userInfo.emailId}
              className="form-control"
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="text-white fs-5">Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={userInfo.mobileNumber}
              className="form-control"
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="text-white fs-5">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userInfo.password}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
              <div id="showPasswordBtn" className="input-group-append">
                <button
                  type="button"
                  className="btn text-white btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"} Password
                </button>
              </div>
            </div>
          </div>
          <div className="text-center">
            {isEditing ? (
              <button
                type="button"
                className="btn btn-lg btn-secondary"
                onClick={handleSaveChangesClick}
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="mt-5">Transaction History</h2>

      <div className="mx-auto mt-3 col-lg-8">
        <Table className="text-center" striped bordered hover>
          <thead>
            <tr>
              <th id="table-header">Transaction ID</th>
              <th id="table-header">Stock Symbol</th>
              <th id="table-header">Stock Name</th>
              <th id="table-header">Type of Transaction</th>
              <th id="table-header">Quantity</th>
              <th id="table-header">Price of Stock</th>
              <th id="table-header">Date of Transaction</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionID}>
                <td>{transaction.transactionID}</td>
                <td>{transaction.symbol}</td>
                <td>{transaction.stockName}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.priceOfStock}</td>
                <td>{transaction.dateOfPurchase}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AuthProvider(Profile);
