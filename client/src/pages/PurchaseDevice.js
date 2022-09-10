import React from "react";
import Form from "../components/Form";
import text from "../assets/Text.json";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../api/apiHelper";
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
      signerResumeTime: event.resumeTime,
    };

    console.table(body);

    // Send request to server
    try {
      const response = await sendRequest("/purchaseDevice", body);
      console.log(`Received response: ${response.data}`);
      navigate("/submitted");
    } catch (error) {
      console.log("handleSubmit error");
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{text.titles.purchaseTitle}</h1>
      <Form includePhone={false} onSubmit={handleSubmit} phonePurchase={true} />
    </div>
  );
}

export default PurchaseDevice;
