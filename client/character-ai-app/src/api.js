import axios from "axios";

const API_URL = "https://your-api-endpoint.com/ask";

export const fetchResponse = async (question) => {
  try {
    const response = await axios.post(API_URL, { question });
    return response.data.answer;
  } catch (error) {
    console.error("API call error:", error);
    throw error; // Re-throw to handle in component
  }
};
