import React from "react";
import { sendRequest } from "../api/apiHelper";
import Form from "../components/Form";
import text from "../assets/Titles.json";
function PurchaseDevice() {
  async function handleSubmit(event) {
    // Make request body
    const body = {
      signerName: event.firstName + " " + event.lastName,
      signerEmail: event.signerEmail,
    };

    console.log(body);

    // Send request to server
    try {
      const response = await sendRequest("/purchaseDevice", body);
      console.log("Received response:");
      console.log(response.data);

      // Received URL for embedded signing, redirect user
      if (response.status === 200) {
        window.location = response.data;
      }
    } catch (error) {
      console.log("handleSubmit error");
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{text.purchaseTitle}</h1>
      <Form includePhone={false} onSubmit={handleSubmit} />
    </div>
  );
}

export default PurchaseDevice;
