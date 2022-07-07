import React from "react";
import axios from "axios";
import textContent from "../assets/text.json";

function Login() {
  // Take outside Login() component? Only if other components will need it
  // Add useCallback()??
  async function handleClickLoginTest() {
    console.log("Clicked login.");
    let temp = await axios.get("/auth/login/callback");
    console.log(temp);
  }

  async function handleClickLogin() {
    try {
      let loginReq = await axios.get("/auth/login");
      console.log(loginReq);

      // If user has never logged in before, redirect to consent screen
      if (loginReq.status === 210) {
        console.log("Consent URL: " + loginReq.data);
        window.location = loginReq.data;
      }
    } catch (error) {
      console.log("Login error.");
      console.log(error);
    }
  }

  return (
    <button onClick={handleClickLogin}>{textContent.login.loginButton}</button>
  );
}

export default Login;
