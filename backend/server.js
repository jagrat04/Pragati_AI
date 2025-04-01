const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const FormData = require("form-data"); 
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// FastAPI base URL
const FASTAPI_URL = "http://localhost:8000"; // Change if FastAPI runs elsewhere

// 1️⃣ **Handle Image Upload & Forward to FastAPI**
app.post("/input", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", req.file.buffer, { filename: req.file.originalname });
  
      // Send request to FastAPI
      const response = await axios.post(`${FASTAPI_URL}/input`, formData, {
        headers: formData.getHeaders(), // Set correct headers
      });
  
      res.json(response.data); // Forward FastAPI response to frontend
    } catch (error) {
      console.error("FastAPI Error:", error.message);
      res.status(500).json({ error: "Failed to send image to FastAPI" });
    }
  });
  
// 2️⃣ **Process Image & Get Response from FastAPI**
app.post("/process/:image_id", async (req, res) => {
  const { image_id } = req.params;

  try {
    // Fetch classification data
    const { data: classificationData } = await axios.post(`${FASTAPI_URL}/data/${image_id}`);
    if (classificationData.error) return res.status(404).json(classificationData);

    // Fetch generated response
    const { data: responseData } = await axios.post(`${FASTAPI_URL}/response/${image_id}`);
    if (responseData.error) return res.status(404).json(responseData);

    res.json({
      message: "Processing complete",
      raw_data: classificationData.raw_data,
      response_text: responseData.response_text,
    });
  } catch (error) {
    console.error("FastAPI Error:", error.message);
    res.status(500).json({ error: "Failed to process image" });
  }
});

// Run Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
