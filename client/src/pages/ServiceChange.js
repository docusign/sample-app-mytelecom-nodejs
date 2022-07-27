import axios from "axios";
import React from "react";
import { useState } from "react";

function ServiceChange() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function sendRequest(urlPath, request) {
    try {
      const response = await axios.post(urlPath, request);

      if (response.status === 200) return response;
      else {
        console.log("Response error, response did not return status of 200");
        console.log("Response status: " + response.status);
      }
    } catch (error) {
      console.log("Send request error");
      console.log(error.response.data);
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();

    // Make request body
    const el = event.target.elements;
    const body = {
      name: el.name.value,
      email: el.email.value,
    };

    console.log(body);

    // Send request to server
    // TODO: validate input
    try {
      const response = await sendRequest("/testapi", body);
      console.log("Received response:");
      console.log(response.data);
    } catch (error) {
      console.log("handleSubmit error");
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name3:
        <input
          type="text"
          name="name"
          // value={name}
        />
      </label>
      <p />
      <label>
        Email3:
        <input
          type="text"
          name="email"
          // value={email}
        />
      </label>
      <p />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default ServiceChange;
