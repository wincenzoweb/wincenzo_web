import React from 'react'
import { useSelector } from 'react-redux';

const Fact = () => {
          const { home } = useSelector((state) => state.page);
        

    return (
      <section className="fact-bg">
        <div className="container">
          <div className="fact-title">
            <div className="fact-main">
              <div className="fact-inner">
                <h2>{home?.experienceTitle}</h2>
                <p>{home?.experienceDescription}</p>
              </div>
            </div>
          </div>
          <div className="all-fact">
            <div className="package">
              <div className="singel-fack">
                <div className="fact-icon">
                  <img src="assets/images/fact_icon01.png" alt='img'/>
                </div>
                <div className="fact-content">
                  <h5>
                    <span className="count">{home?.packageDelivered}</span> km
                  </h5>
                  <p>Package Delivered</p>
                </div>
              </div>
            </div>
            <div className="package">
              <div className="singel-fack">
                <div className="fact-icon">
                  <img src="assets/images/fact_icon02.png" alt='img'/>
                </div>
                <div className="fact-content">
                  <h5>
                    <span className="count">{home?.countriesCovered}</span>{" "}
                  </h5>
                  <p>Countries Covered</p>
                </div>
              </div>
            </div>
            <div className="package">
              <div className="singel-fack">
                <div className="fact-icon">
                  <img src="assets/images/fact_icon03.png" alt='img'/>
                </div>
                <div className="fact-content">
                  <h5>
                    <span className="count">{home?.happyCustomer}</span> k
                  </h5>
                  <p>Happy Customer</p>
                </div>
              </div>
            </div>
            <div className="package">
              <div className="singel-fack">
                <div className="fact-icon">
                  <img src="assets/images/fact_icon04.png" alt='img'/>
                </div>
                <div className="fact-content">
                  <h5>
                    <span className="count">{home?.yearOfExperience}</span> yr
                  </h5>
                  <p>Year Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Fact
