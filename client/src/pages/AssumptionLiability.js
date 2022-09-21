import React from "react";
import { useNavigate } from "react-router-dom";

import { sendRequest } from "../api/apiHelper";
import Form from "../components/Form";
import text from "../assets/Text.json";

function Liability() {

  async function handleSubmit(event) {
    // Make request body
    const body = {
      signerName: event.firstName + " " + event.lastName,
      signerEmail: event.signerEmail,
      recipientName: event.recipientFirstName + " " + event.recipientLastName,
      recipientPhone: event.phoneNumber,
      recipientCountryCode: event.countryCode
    };

    // Send request to server
    try {
      const response = await sendRequest("/assumptionLiability", body);
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
      <h1>{text.titles.assumptionTitle}</h1>
      <Form includePhone={false} onSubmit={handleSubmit} assumptionLiability={true} />
    </div>
  );
}

export default Liability;
