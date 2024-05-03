import React from "react";
import { InputSixStacksForm } from "./InputSixStacksForm";

export const AddressInputs = ({ name, userInput, setInput }) => {
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
  };
  return (
    <div style={eachInputBox}>
      <h1>{name}</h1>
      <InputSixStacksForm
        //Name/Company
        typeOne="text"
        placeholderOne="Name / Company"
        onChangeOne={(e) => setInput({ ...userInput, name: e.target.value })}
        valueOne={userInput.name}
        //Address
        typeTwo="text"
        placeholderTwo="Address"
        onChangeTwo={(e) =>
          setInput({ ...userInput, address: e.target.value })
        }
        valueTwo={userInput.address}
        // className="addresh"
        //zip
        type="text"
        placeholderThree="Zip:"
        onChangeThree={(e) => setInput({ ...userInput, zip: e.target.value })}
        valueThree={userInput.zip}

        //Phone No
        typeFour="text"
        placeholderFour="Phone No:"
        onChangeFour={(e) =>
          setInput({ ...userInput, phoneno: e.target.value })}
        valueFour={userInput.phoneno}
        //dimension no
        typeFive="text"
        placeholderFive="Dimension No:"
        onChangeFive={(e) =>
          setInput({ ...userInput, dimensionNo: e.target.value })
        }
        valueFive={userInput.dimensionNo}
        //payment
        typeSix="text"
        placeholderSix="Payment:"
        onChangeSix={(e) => setInput({ ...userInput, payment: e.target.value })}
        valueSix={userInput.payment}
        //cod amount
        typeSeven="text"
        placeholderSeven="COD Amount:"
        onChangeSeven={(e) => setInput({ ...userInput, codamount: e.target.value })}
        valueSeven={userInput.codamount}
        //ewaybill
        typeEight="text"
        placeholderEight="Weight:"
        onChangeEight={(e) => setInput({ ...userInput, weight: e.target.value })}
        valueEight={userInput.weight}
        //weight
        typeNine="text"
        placeholderNine="eWaybill No.:"
        onChangeNine={(e) => setInput({ ...userInput, eWaybillno: e.target.value })}
        valueNine={userInput.eWaybillno}

        //shipped by
        typeTen="text"
        placeholderTen="GSTIN :"
        onChangeTen={(e) => setInput({ ...userInput, gstin: e.target.value })}
        valueTen={userInput.gstin}
      />
    </div>

  );
};

/*
  setName,
  setStreetLine1,
  setStreetLine2,
  setCity,
  setState,
  setZip,
  valueName,
  valueStreetLine1,
  valueStreetLine2,
  valueCity,
  valueState,
  valueZip
  
<AddressInputs
  mainLabel="Shipper:"
  onChangeName={(e) =>
    setShipperInput({ ...shipperInput, name: e.target.value })
  }
  onChangeStreetLine1={(e) =>
    setShipperInput({ ...shipperInput, streetLine1: e.target.value })
  }
  valueName={shipperInput.name}
  valueStreetLine1={shipperInput.streetLine1}
/>
<Input
        type="text"
        placeholder="Name / Company"
        onChange={onChange}
        value={value}
      />
*/
