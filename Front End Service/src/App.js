import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Portfolio from "./Components/Portfolio/Portfolio";
import Watchlist from "./Components/WatchList/Watchlist";
import CreatePortfolio from "./Components/Dashboard/CreatePortfolio";
import EsgRating from "./Components/WatchList/EsgRating";
import KnowledgeCentre from "./Components/Dashboard/KnowledgeCentre";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Profile from "./Components/User/Profile";
import User from "./Components/User/User";
import Home from "./Components/User/Home";
import PrivateRoute from "./PrivateRoute";
import CompanyEsgRating from "./Components/WatchList/CompanyEsgRating";
import EditPortfolio from "./Components/Dashboard/EditPotfolio";
import CreatePortfolioService from "./Components/Dashboard/CreatePortfolioService";

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Home />}></Route>

          {/*Protected Components*/}
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/edit-profile" element={<Profile />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/watchlist" element={<Watchlist />}></Route>
          <Route path="/create-portfolio" element={<CreatePortfolio />}></Route>
          <Route
            path="/edit-portfolio/:userId/:portfolioId"
            element={<EditPortfolio />}
          ></Route>
          <Route path="/esgrating" element={<EsgRating />}></Route>
          <Route path="/knowledgecentre" element={<KnowledgeCentre />}></Route>
          <Route
            path="/ESGRatings/:selectedCompany"
            element={<CompanyEsgRating />}
          />

          {/*Components that are accesible before login */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          {/* For Invalid Routes redirect to Home*/}
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
