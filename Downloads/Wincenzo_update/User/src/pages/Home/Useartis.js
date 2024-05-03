// import React from "react";
// import { useSelector } from "react-redux";

// const Useartis = () => {
//   const { home } = useSelector((state) => state.page);

//   return (
//     <section className="supplement-main">
//       <div className="container">
//         <div className="supplement1">
//           <div className="suppke">
//             <div className="suppke-main">
//               <h2>{home?.higlightProductTitle}</h2>
//               <div className="bar"></div>
//               <p>{home?.higlightProductDescription}</p>
//             </div>
//           </div>
//         </div>
//         <div className="supplement2">
//           <div className="pain">
//             <div className="redauces-box">
//               <h4>Redauces pain</h4>
//               <div className="redauces-img">
//                 <img src="assets/images/Group 4.png" alt="injection"/>
//               </div>
//             </div>
//             <div className="redauces-box">
//               <h4>Redauces pain</h4>
//               <div className="redauces-img">
//                 <img src="assets/images/Group 4.png" alt="injection"/>
//               </div>
//             </div>
//             <div className="redauces-box">
//               <h4>Redauces pain</h4>
//               <div className="redauces-img">
//                 <img src="assets/images/Group 4.png" alt="injection"/>
//               </div>
//             </div>
//           </div>
//           <div className="painimg">
//             <div className="services-img">
//               <img src={home?.higlightProductImage} alt="highightImage"/>
//             </div>
//           </div>
//           <div className="pain pain2">
//             <div className="redauces-box">
//               <h4>Redauces pain</h4>
//               <div className="redauces-img">
//                 <img src="assets/images/Group 4.png" alt="injection"></img>
//               </div>
//             </div>
//             <div className="redauces-box">
//               <h4>Redauces pain</h4>
//               <div className="redauces-img">
//                 <img src="assets/images/Group 4.png" alt="injection"></img>
//               </div>
//             </div>
//             <div className="redauces-box">
//               <h4>Redauces pain</h4>
//               <div className="redauces-img">
//                 <img src="assets/images/Group 4.png" alt="injection"></img>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Useartis;

import React from "react";
import { useSelector } from "react-redux";

const Useartis = () => {
  const { home } = useSelector((state) => state.page);
  const highlightProductFeature = home?.higlightProductFeature || []; // Ensure highlightProductFeature is an array
  console.log(highlightProductFeature)
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  // Split the highlightProductFeature array into two parts
  const topFeatures = highlightProductFeature.slice(0, 3); // First three items
  const bottomFeatures = highlightProductFeature.slice(3); // Last three items

  return (
    <>
      
      <section className="supplement-main">
        <div className="container">
          <div className="supplement1">
            <div className="suppke">
              <div className="suppke-main">
                <h2>{home?.higlightProductTitle}</h2>
                <div className="bar"></div>
                <p>{home?.higlightProductDescription}</p>
              </div>
            </div>
          </div>
          <div className="supplement2">
            <div className="pain">
              {/* Display first three items above the painimg element */}
              {topFeatures.map((feature, index) => (
                <div className="redauces-box" key={index}>
                  <div className="redauces-img">
                    <img className="featurethumb" src={imgUrl + feature?.productFeatureThumb} alt="injection" />
                  </div>
                  <h4 className="order-lg-first order-md-first">{feature?.productFeature}</h4>
                </div>
              ))}
            </div>
            <div className="painimg">
              <div className="services-img">
                <img src={imgUrl + home?.higlightProductImage} alt="highightImage" />
              </div>
            </div>
            <div className="pain pain2">
              {/* Display last three items below the painimg element */}
              {bottomFeatures.map((feature, index) => (
                <div className="redauces-box" key={index}>
                  <div className="redauces-img">
                    <img className="featurethumb" src={imgUrl + feature?.productFeatureThumb} alt="injection" />
                  </div>
                  <h4>{feature?.productFeature}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Useartis;

