import React from "react";
import axios from "axios";
import textContent from "../assets/text.json";

function Login() {
  async function handleLogin() {
    try {
      let res = await axios.get("/auth/login");
      console.log(res);

      // If user has never logged in before, redirect to consent screen
      if (res.status === 210) {
        console.log("Consent URL: " + res.data);
        window.location = res.data;
      }
    } catch (error) {
      console.log("Login error.");
      console.log(error.response.data);
    }
  }

  async function handleLogout() {
    try {
      let res = await axios.get("/auth/logout");
      console.log(res);
      if (res.status !== 200) {
        throw Error(
          "Did not receive expected status code, logout error occurred."
        );
      }
    } catch (error) {
      console.log("Logout error.");
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={handleLogin}>{textContent.login.loginButton}</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Login;
