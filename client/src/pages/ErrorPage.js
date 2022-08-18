import React from "react";
import text from "../assets/Text.json";
function ErrorPage() {
  return (
    <div>
      <h1>{text.errorText.notFound}</h1>
    </div>
  );
}

export default ErrorPage;
