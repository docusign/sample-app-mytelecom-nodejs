import React from "react";
import text from "../assets/Text.json";
import ServiceChangeForm from "../components/ServiceChangeForm";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../api/apiHelper";
function ServiceChange() {
  const navigate = useNavigate();
  async function handleSubmit(event) {
    // Make request body
    const body = {
      signerName1: event.firstName1 + " " + event.lastName1,
      signerEmail1: event.signerEmail1,
    };

    console.log(body);

    // Send request to server
    try {
      const response = await sendRequest("/serviceChange", body);
      console.log(`Received response: ${response.data}`);
      navigate("/submitted");
    } catch (error) {
      console.log("handleSubmit error");
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{text.titles.serviceChangeTitle}</h1>
      <ServiceChangeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ServiceChange;
