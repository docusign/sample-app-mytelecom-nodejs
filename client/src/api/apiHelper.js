import axios from "axios";
import errorText from "../assets/Text.json";

// For making HTTP POST request using the given url and request
export async function sendRequest(urlPath, request) {
  try {
    const response = await axios.post(urlPath, request);
    return handleResponse(response);
  } catch (error) {
    console.error(error);
  }
}

// Returning response if a success, otherwise throw an error
export async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response;
  }

  // Unknown error occurred
  throw new Error(errorText.unknownError);
}

// If there was an error, extract the message and display it
export function handleError(error) {
  const errorMessage = error.response.data;
  let errorPageText;
  if (errorMessage) {
    errorPageText = {
      title: errorMessage.title,
      description: errorMessage.description,
    };
  }
  return errorPageText;
}
