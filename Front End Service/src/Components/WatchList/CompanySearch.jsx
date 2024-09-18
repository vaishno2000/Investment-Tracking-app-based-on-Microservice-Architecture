import React, { useState, useEffect } from "react";
import "./CompanySearch.css";
import { Link } from "react-router-dom";

export default function CompanySearch({ getCompanySelected }) {
  const [companyList, setCompanyList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

  // uncomment
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://gaialens-company-names.p.rapidapi.com/companynames";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "<Generate key from RapidAPI and add here>",
          "X-RapidAPI-Host": "gaialens-company-names.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setCompanyList(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company.companyname);
  };

  const filteredCompanyList = companyList.filter((item) =>
    item.companyname.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSearch = () => {
    getCompanySelected(selectedCompany);
    setSelectedCompany(null);
    setFilterText("");
  };

  const renderLink = selectedCompany ? (
    <Link to={`/ESGRatings/${selectedCompany}`} className="btn sbtn">
      Search
    </Link>
  ) : (
    <span className="btn sbtn disabled">Search</span>
  );

  return (
    <form className="d-flex" role="search">
      <div className="dropdown companyDropDown">
        <button
          className="btn dbtn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedCompany || "Select Company"}
        </button>
        <ul className="dropdown-menu scrollable-dropdown">
          <li>
            <input
              className="dropdown-item"
              type="text"
              placeholder="Search Symbol"
              value={filterText}
              onChange={handleFilterChange}
            />
          </li>
          {filteredCompanyList.length === 0 ? (
            <li>Loading...</li>
          ) : (
            filteredCompanyList.map((item, index) => (
              <li key={index}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleCompanySelect(item)}
                >
                  {item.companyname}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
      <Link
        className="btn sbtn"
        onClick={handleSearch}
        disabled={!selectedCompany}
        to={`/ESGRatings/${selectedCompany}`}
      >
        Search
      </Link>
    </form>
  );
}
