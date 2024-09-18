import React from "react";
import "./EsgContent.css";

export default function EsgContent() {
  return (
    <div className="mx-auto text-center">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">ESG SCORE</div>
            <div className="card-body">
              <h5 className="card-title">
                What is the ESG Score of a Company?
              </h5>

              <p className="card-text">
                ESG scores are a measure of how well a company addresses risks
                and concerns related to environmental, social, and corporate
                governance issues in its day-to-day operations. These scores are
                important for socially responsible investors who want to invest
                in companies as they provide an insight into a company’s
                long-term performance and resilience.
              </p>
            </div>
          </div>
        </div>
        <div className="col no-left-padding">
          <div className="card">
            <div className="card-header">GOOD ESG SCORE</div>
            {/* <img
              class="card-img-top"
              src="
              https://urbanfootprint.com/wp-content/uploads/2022/08/What-are-ESG-scores-1.png"
              alt="Card image cap"
            /> */}
            <div className="card-body">
              <h5 className="card-title">
                What Is Considered a Good ESG Score?
              </h5>

              <p className="card-text">
                Many ESG scores range from 0 to 100, with scores below 50
                considered poor and scores above 70 deemed good. Most scoring is
                carried out so that a company is comparable to peers in the same
                industry. Investors should research the specific rating agency’s
                methodology to understand how these scores are calculated and
                their implications.
              </p>
            </div>
          </div>
        </div>
        <div className="col no-left-padding">
          {" "}
          <div className="card ">
            <div className="card-header">INVESTOR'S BENEFIT</div>
            <div className="card-body">
              <h5 className="card-title">
                What Can ESG Scores Tell Investors?
              </h5>

              <p className="card-text">
                Investors use ESG scores to make informed investment decisions,
                evaluate a company’s long-term prospects, and assess the
                sustainability of its operations. High ESG scores indicate that
                a company is effectively managing environmental, social, and
                governance risks, which can lead to better financial performance
                and lower investment risk.
              </p>
            </div>
          </div>
        </div>
        <div className="col no-left-padding">
          {" "}
          <div className="card">
            <div className="card-header">LIMITATIONS</div>
            <div className="card-body">
              <h5 className="card-title">
                What Are Some Limitations of ESG Scores?
              </h5>

              <p className="card-text">
                One limitation of ESG scores is the lack of standardization in
                methodologies and criteria used by the various rating agencies,
                which employ different approaches to assess and weight ESG
                factors. ESG scores may also not capture all relevant aspects of
                a company’s sustainability performance, as certain issues may be
                overlooked or underestimated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
