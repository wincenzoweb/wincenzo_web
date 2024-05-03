import React from 'react'

export default function ShippingPage() {

    const [shipperInput, setShipperInput] = useState({
        name: "",
        address: "",
        phoneno: "",
        dimensionNo: "",
        codamount: "",
        payment: "",
        weight: "",
        eWaybillno: "",
        shippedby: "",
        zip: "",
        gstin: ""
    });

    const [submittedData, setSubmittedData] = useState({
        shipper: {
            name: "",
            address: "",
            phoneno: "",
            dimensionNo: "",
            codamount: "",
            payment: "",
            weight: "",
            eWaybillno: "",
            shippedby: "",
            zip: "",
            gstin: ""
        },

    });
    const [isValidData, setIsValidData] = useState(false);
    const [base64Value, setBase64Value] = useState("");

    const handleSubmit = () => {
        console.log("generate label clicked");
        //TODO: input validation
        setIsValidData(true);
        convertUUIDtoBase64();
        setSubmittedData({
            ...submittedData,
            shipper: {
                name: shipperInput.name,
                address: shipperInput.address,
                phoneno: shipperInput.phoneno,
                zip: shipperInput.zip,
                dimensionNo: shipperInput.dimensionNo,
                codamount: shipperInput.codamount,
                payment: shipperInput.payment,
                weight: shipperInput.weight,
                eWaybillno: shipperInput.eWaybillno,
                gstin: shipperInput.gstin,
            },

        });
    };

    
    const convertUUIDtoBase64 = () => {
        const base64 = require("uuid-base64");
        const id = base64.encode(uuidv4());
        setBase64Value(id);
    };
    return (
        <>
            <div>
                <div className="inputs">
                    {/* <div className="addressInputsBox">
                        <AddressInputs
                            name="Shipper:"
                            userInput={shipperInput}
                            setInput={setShipperInput}
                        />

                    </div> */}
                    <div className="btn_container">
                        <button className="btn_generateLabel" onClick={handleSubmit}>
                            GENERATE LABEL
                        </button>
                    </div>
                </div>
                {isValidData && (
                    <div className="outputs">
                        <ShippingLabel shipperData={submittedData && submittedData.shipper}/>
                    </div>
                )}
            </div>
        </>
    )
}
