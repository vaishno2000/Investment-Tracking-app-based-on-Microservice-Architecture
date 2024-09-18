import React from "react";
import "./EsgNewsCard.css";

function EsgNewsCard({ esgNews, selectedCompany }) {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  if (!selectedCompany || selectedCompany === null) {
    return <></>;
  }

  if (!esgNews || esgNews.length === 0) {
    return (
      <div className="col-md-7  mx-auto text-center">
        <div className="card esgrating-body">
          <div className="card-body">
            <h5 className="card-title">Loading ...</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-7 mx-auto esgNews">
      {esgNews.map((news, index) => (
        <div className="card" key={index}>
          <div className="card-header">ESG News: {news.title}</div>
          <div className="card-body">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Environment Controversy</th>
                  <th>{news.environment_controversy_score}</th>
                  <td>{news.environment_controversy_reasoning}</td>
                </tr>
                <tr>
                  <th scope="row">Social Controversy</th>
                  <th>{news.social_controversy_score}</th>
                  <td>{news.social_controversy_reasoning}</td>
                </tr>
                <tr>
                  <th scope="row">Governance Controversy</th>
                  <th>{news.governance_controversy_score}</th>
                  <td>{news.governance_controversy_reasoning}</td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <div className="col">
                <p className="card-text" style={{ margin: 0 }}>
                  <small className="text-muted">
                    Published On: {formatDate(news.date)}
                  </small>
                </p>
              </div>
              <div className="col right-align">
                <p className="card-text" style={{ margin: 0 }}>
                  <a href={news.url}>Go to Article</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EsgNewsCard;
