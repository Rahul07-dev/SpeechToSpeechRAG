const axios = require("axios");
// require("dotenv").config();
const modelName = "facebook/llama-7b";
const apiKey = process.env.LLAMA_API_TOKEN;
const url = process.env.LLAMA_URL;

const apiToken = process.env.LLAMA_API_TOKEN;
const apiURL = process.env.LLAMA_URL;

async function callHuggingFaceAPI(question, context) {
  try {
    // Construct valid JSON data
    const data = {
      inputs: context,
      // context: context,
    };

    // Log the structured JSON data
    console.log("Structured JSON data:", data);

    // Make the API request
    const response = await fetch(apiURL, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data), // Ensure it's JSON
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the JSON response
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in callHuggingFaceAPI:", error.message);
    throw error;
  }
}


module.exports = { callHuggingFaceAPI };
