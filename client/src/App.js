import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";

function App() {
  // const [backendData, setBackendData] = useState([{}]);
  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.json())
  //     .then((data) => setBackendData(data));
  // }, []);

  return (
    <div>
      <h1>Welcome to MyTelecom</h1>
      <Login />
      {/* {typeof backendData === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )} */}
    </div>
  );
}

export default App;
