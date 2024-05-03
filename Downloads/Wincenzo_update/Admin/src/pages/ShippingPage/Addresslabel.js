import React from "react";
// what does && means? left && right => if(left) {right}

const AddressLabel = ({
  name,
  address,
  zip,
  phoneno,
  GSTIN,
  // dimensionNo,
  // codamout,
  // weight,
  // eWaybillno,
  // shippedby,
  style,
  setLineHeight
}) => {
  const eachLine = {
    styleLineHeight: {
      lineHeight: setLineHeight
    }
  };
  return (
    <div>
      <div style={style} className="shipp">
        <p style={eachLine.styleLineHeight}>{name}</p>
        <p style={eachLine.styleLineHeight}>{address}</p>
        <p style={eachLine.styleLineHeight}>{zip}</p>
        <p style={eachLine.styleLineHeight}>{phoneno}</p>
      </div>
        {/* <hr style={{ width: '100%',border:'2px solid black'}} /> */}
        {/* <p style={eachLine.styleLineHeight}>{dimensionNo}</p> */}
        {/* <p style={eachLine.styleLineHeight}>{codamout}</p> */}
        {/* <p style={eachLine.styleLineHeight}>{weight}</p> */}
        {/* <p style={eachLine.styleLineHeight}>{eWaybillno}</p> */}
        {/* <p style={eachLine.styleLineHeight}>{shippedby}</p> */}
      
    </div>

  );
};

//Set default props:
// Address.defaultProps = {
//   setLineHeight: {
//     lineHeight: "normal"
//   }
// };

export default AddressLabel;
