import React, { useState, useEffect } from "react";
import "./Watchlist.css";
import { Link } from "react-router-dom";
import "./EsgRating.css";
import CompanySearch from "./CompanySearch";
import EsgContent from "./EsgContent";

export default function Watchlist() {
  const [selectedCompany, setSelectedCompany] = useState("");

  return (
    <div className="watchlistbody">
      <div className="watchlistheader text-center">
        <h1 className="white-text">ESG RATING</h1>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <CompanySearch getCompanySelected={setSelectedCompany} />
            </div>
            <div className="col"></div>
            <div className="col">
              <button className="btn wbtn ">
                <Link className="nav-link active" to="/watchlist">
                  WATCHLIST
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="esgbody">
        <div className="row mt-3">
          <div className="col">
            <EsgContent />
          </div>
        </div>
      </div>
    </div>
  );
}
