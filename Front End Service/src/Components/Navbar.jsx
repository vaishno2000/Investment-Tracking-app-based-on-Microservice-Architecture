import React from "react";
import { Link,useNavigate  } from "react-router-dom";
import "./Navbar.css";
import './User/UserService'
import UserService from "./User/UserService";
import { useState } from "react";
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const HandleLogout=() => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("userId");
    const logout=async() => { await UserService.logoutUser();}
    console.log("Logout Successful");
    navigate('/login'); // Redirect to the login page after logout
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg white-text">
        <div className="container-fluid">
          <Link className="navbar-brand white-text" to="/">
            INVESTMENT TRACKER
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {sessionStorage.getItem('userId') &&(<Link className="nav-link active white-text" to="/dashboard">
                  Dashboard
                </Link>)}
              </li>
              <li className="nav-item">
                {sessionStorage.getItem('userId') &&(<Link className="nav-link active white-text" to="/portfolio">
                  Portfolio
                </Link>)}
              </li>
              <li className="nav-item">
                {sessionStorage.getItem('userId') &&(<Link className="nav-link active white-text" to="/watchlist">
                  Watchlist
                </Link>)}
              </li>
            </ul>
            <button className="btn navbtn white-text" type="submit" onClick={HandleLogout}>
              <Link className="nav-link active" to="/login">
                {sessionStorage.getItem('userId')?'Logout':'Login'}
              </Link>
            </button>
            <Link className="nav-link active" to="/edit-profile">
                <i className="fas mx-3 fs-4">&#xf406;</i>
              </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}