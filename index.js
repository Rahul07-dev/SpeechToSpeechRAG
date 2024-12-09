require("dotenv").config();
const express = require("express");
const app = express();
const ragRoutes = require("./routes/rag.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/rag", ragRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
