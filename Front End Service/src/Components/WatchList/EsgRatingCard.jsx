import React from "react";
import "./EsgRatingCard.css";

function EsgRatingCard({ esgRating, selectedCompany }) {
  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (!selectedCompany || selectedCompany === null) {
    return (
      <div>
        <div className="col-md-12  mx-auto text-center">
          <div className="card esgrating-body">
            <div className="card-body">
              <h5 className="card-title">
                Company has not been selected. Please selected the Company whose
                ESG Rating you want to view.
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!esgRating || esgRating.length === 0) {
    return (
      <div className="col-md-5  mx-auto text-center">
        <div className="card esgrating-body">
          <div className="card-body">
            <h5 className="card-title">Loading ...</h5>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-md-5">
      {/* <h3 className="text-center">ESG Score </h3> */}
      <div className="card">
        <div className="card-header">ESG SCORE</div>
        <div className="card-body">
          <h5 className="card-title">{esgRating.companyname}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {esgRating.tickersymbol} - {esgRating.exchangename}
          </h6>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">COUNTRY: {esgRating.country}</li>
            <li className="list-group-item">INDUSTRY: {esgRating.industry}</li>
            <li className="list-group-item">YEAR: {esgRating.Year}</li>
          </ul>
          <div className="card-text">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Overall ESG Score</th>
                  <th scope="col">{esgRating["Overall Score"].toFixed(2)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Overall Transperancy Score</th>
                  <td>{esgRating["Overall Transparency Score"].toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">Environmental Pillar Score</th>
                  <td>{esgRating["Environmental Pillar Score"].toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">Social Pillar Score</th>
                  <td>{esgRating["Social Pillar Score"].toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">Governance Pillar Score</th>
                  <td>{esgRating["Governance Pillar Score"].toFixed(2)}</td>
                </tr>
                <tr>
                  <th scope="row">Overall Score Global Rank</th>
                  <td>{esgRating["Overall Score Global Rank"]}</td>
                </tr>
                <tr>
                  <th scope="row">Overall Industry Rank</th>
                  <td>{esgRating["Overall Industry Rank"]}</td>
                </tr>
                <tr>
                  <th scope="row">Overall Region Rank</th>
                  <td>{esgRating["Overall Region Rank"]}</td>
                </tr>
              </tbody>
            </table>
            <p className="card-text scoreDate" style={{ margin: 0 }}>
              <small className="text-muted">
                Latest Score Date: {formatDate(esgRating["Latest Score Date"])}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EsgRatingCard;
