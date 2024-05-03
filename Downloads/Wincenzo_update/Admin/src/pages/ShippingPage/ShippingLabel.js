import React from "react";
import AddressLabel from "./Addresslabel";
import Barcode from "react-barcode";

const ShippingLabel = () => {
  const shippingAddressStyles = {
    label: {
      fontFamily: "sans-serif",
      fontSize: "1.2rem"
    },
    receipientStyle: {
      fontSize: "1.5rem"
    },
    shipToStyle: {
      marginTop: "0",
      marginBottom: ".5rem",
      fontSize: "12px",
      fontweight: "700"
    }
  };

  return (
    <div style={shippingAddressStyles.label}>
      <div className="main">
        <div className="shop">
          <div className="shippingAddress">
            <p style={shippingAddressStyles.shipToStyle}>SHIP TO:</p>
            <AddressLabel
              name={shipperData.name}
              address={shipperData.address}
              zip={shipperData.zip}
              phoneno={shipperData.phoneno}
            />
          </div>
          <div className="shippingimg">
            <img src="/img/logo.png" alt="img" className="shipimage"></img>
          </div>
        </div>
      </div>
      <div className="shippingAddress2">
        <div className="fixtext">
          <div className="qrcode">
            <h5>Dimension:<span className="dimension">{shipperData.dimensionNo}</span></h5>
            <h5 className="payment2">Payment:<span className="payment">{shipperData.payment}</span></h5>
            <h5 className="codamount2">COD Amount:<span className="codamount">{shipperData.codamount}</span></h5>
            <h5 className="weight2">weight:<span className="weight">{shipperData.weight}</span></h5>
            <h5>eWaybillno:<span className="ewaybillno">{shipperData.eWaybillno}</span></h5>
          </div>
          <div className="qrcode2">
            <div className="qucodetext">
              <h4>Shadowfax Surface</h4>
              <div className="qrcodeimg">

                <Barcode value="Lable1234567890" className="shipimage" />
              </div>
              <h4>Routing Code: NA</h4>
            </div>
          </div>
        </div>

      </div>
      <div className="shippby">
        <div className="gstin">
          <div className="order">
            <p>Shipped By<span className="return">(If undelivered, return to)</span></p>
            <h6>VS Atlanta 211,vakartund solution</h6>
            <h5>GSTIN:<span className="gstin">{shipperData.gstin}</span></h5>
          </div>
          <div className="ordernow">
            <div className="qucodetext">
              <h4>Order #: ORD652E25FE0526D168</h4>
              <div className="qrcodeimg">
                <Barcode value="Lable1234567890" className="shipimage" />
              </div>
              <h4>Invoice No.: Retail00030</h4>
              <h4>Invoice Date: 2023-10-17</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="table-form">
        <table>
          <tr>
            <th className="sku">Product Name & <br></br>SKU</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Taxable Value</th>
            <th>IGST</th>
            <th>Total</th>
          </tr>
          <tr className="tabhei">
            <td className="jens">Jeans<br></br> SKU: cbs123</td>
            <td className="text">441122</td>
            <td className="num">11</td>
            <td>0.950000</td>
            <td>-8.570989</td>
            <td>0.058790</td>
            <td className="text2">-9.003456</td>
          </tr>
        </table>
      </div>
      <div>
        <h3>Gmail:vakartundsolutiongmail.com</h3>
      </div>
    </div>
  );
};

export default ShippingLabel;
