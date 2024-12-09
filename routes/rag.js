const express = require("express");
const router = express.Router();
const { retrieveDocuments } = require("../services/document.js");
const { callHuggingFaceAPI } = require("../services/huggingFace.js");


router.post("/query", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  try {
    const documents = await retrieveDocuments(query);
    console.log("docs", documents);
    // const modelInput = `${documents} \n Question: ${query}`;
    // console.log("Mi", modelInput);
    const generatedResponse = await callHuggingFaceAPI(documents, query);
    // console.log("genRes:generatedResponse)
    return res.json({ response: generatedResponse });
  } catch (error) {
    console.error("Error in RAG workflow:", error.message);
    return res.status(500).json({ error: "Internal server error", query });
  }
});

module.exports = router;
