import React from "react";
import { useNavigate } from "react-router-dom";

import { sendRequest } from "../api/apiHelper";
import Form from "../components/Form";
import text from "../assets/Text.json";

function Liability() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    // Make request body
    const body = {
      signerName: event.firstName + " " + event.lastName,
      signerEmail: event.signerEmail,
      recipientName: event.recipientFirstName + " " + event.recipientLastName,
      recipientPhone: event.recipientPhoneNumber,
      recipientCountryCode: event.countryCode
    };

    console.log(body);

    // Send request to server
    try {
      const response = await sendRequest("/assumptionLiability", body);
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
      <h1>{text.titles.assumptionTitle}</h1>
      <Form includePhone={false} onSubmit={handleSubmit} assumptionLiability={true} />
    </div>
  );
}

export default Liability;
