import React from "react";
import { useNavigate } from "react-router-dom";

import { sendRequest } from "../api/apiHelper";
import Form from "../components/Form";
import text from "../assets/Titles.json";
function PurchaseDevice() {
  const navigate = useNavigate();
  async function handleSubmit(event) {
    // Make request body
    const body = {
      signerName: event.firstName + " " + event.lastName,
      signerEmail: event.signerEmail,
      signerPhoneSelection: event.phoneSelection,
      signerInsuranceSelection: event.insurance,
      signerDownPayment: event.downPayment,
    };

    console.log(body);

    // Send request to server
    try {
      const response = await sendRequest("/purchaseDevice", body);
      console.log("Received response:");
      console.log(response.data);

      navigate("/submitted");
    } catch (error) {
      console.log("handleSubmit error");
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{text.purchaseTitle}</h1>
      <Form includePhone={false} onSubmit={handleSubmit} phonePurchase={true} />
    </div>
  );
}

export default PurchaseDevice;
