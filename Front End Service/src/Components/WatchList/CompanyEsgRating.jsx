import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EsgRatingCard from "./EsgRatingCard";
import EsgNewsCard from "./EsgNewsCard";

export default function CompanyEsgRating() {
  const { selectedCompany } = useParams();
  const [esgRating, setEsgRating] = useState([]);
  const [esgNews, setEsgNews] = useState([]);
  // uncomment
  useEffect(() => {
    if (selectedCompany) {
      const fetchData = async () => {
        const baseURL = "https://gaialens-esg-scores.p.rapidapi.com/scores";
        const queryParams = {
          companyname: selectedCompany,
        };
        const queryString = Object.keys(queryParams)
          .map((key) => `${key}=${queryParams[key]}`)
          .join("&");
        const url = `${baseURL}?${queryString}`;

        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "<Generate key from RapidAPI and add here>",
            "X-RapidAPI-Host": "gaialens-esg-scores.p.rapidapi.com",
          },
        };
        try {
          const response = await fetch(url, options);
          if (response.ok) {
            const data = await response.json();
            setEsgRating(data);
            // console.log(data);
          } else {
            console.error("Request failed with status:", response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedCompany) {
      const fetchData = async () => {
        const baseURL = "https://gaialens-esg-news.p.rapidapi.com/news";
        const queryParams = {
          companyname: selectedCompany,
        };
        const queryString = Object.keys(queryParams)
          .map((key) => `${key}=${queryParams[key]}`)
          .join("&");
        const url = `${baseURL}?${queryString}`;

        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "<Generate key from RapidAPI and add here>",
            "X-RapidAPI-Host": "gaialens-esg-news.p.rapidapi.com",
          },
        };
        try {
          const response = await fetch(url, options);
          if (response.ok) {
            const data = await response.json();
            setEsgNews(data);
            console.log(data);
          } else {
            console.error("Request failed with status:", response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [selectedCompany]);

  return (
    <div>
      <div className="watchlistheader text-center">
        <h1 className="white-text">ESG RATING</h1>
        <div className="container text-center">
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col">
              <button className="btn wbtn">
                <Link className="nav-link active" to="/esgRating">
                  ESG Rating
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="esgbody">
        <div className="row">
          <EsgRatingCard
            esgRating={esgRating[0]}
            selectedCompany={selectedCompany}
          ></EsgRatingCard>
          <EsgNewsCard
            esgNews={esgNews}
            selectedCompany={selectedCompany}
          ></EsgNewsCard>
        </div>
      </div>
    </div>
  );
}
