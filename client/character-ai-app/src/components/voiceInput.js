import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { gsap } from "gsap";
import "./VoiceInput.css"; // Import the CSS file
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner

const VoiceInput = () => {
  const { transcript, listening } = useSpeechRecognition();
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!transcript) return;

    setLoading(true);
    setErrorMessage(""); // Clear previous error messages

    try {
      const response = await axios.post("http://localhost:5000/rag/query", {
        query: transcript,
      });
    //   const generated_text = response["response"][0]["generated_text"];
    const generatedText = response.data.response[0].generated_text;
      setResponseText(generatedText);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartListening = () => {
    SpeechRecognition.startListening();
    gsap.to(".listening-button", {
      scale: 1.1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Character AI Voice Assistant</h1>
      <button
        className={`listening-button ${listening ? "active" : ""}`}
        onClick={handleStartListening}
      >
        Start Listening
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <p>{listening ? "Listening..." : 'Click "Start Listening"'}</p>
      <p>Transcript: {transcript}</p>

      <button onClick={handleSubmit} disabled={!transcript || loading}>
        Submit
      </button>

      {loading && <ClipLoader size={30} color={"#007bff"} loading={loading} />}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <h2>Response:</h2>
      <p>{responseText}</p>
    </div>
  );
};

export default VoiceInput;
