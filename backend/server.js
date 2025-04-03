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

const FASTAPI_URL = "http://localhost:8000"; // Ensure FastAPI is running here

// 1️⃣ **Upload Image & Forward to FastAPI**
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

// 2️⃣ **Fetch Processed Classification Result**
app.get("/process/:image_id", async (req, res) => {
    const { image_id } = req.params;

    try {
        // Fetch classification result from FastAPI
        const { data: classificationData } = await axios.get(`${FASTAPI_URL}/process/${image_id}`);
        
        res.json(classificationData);
    } catch (error) {
        console.error("FastAPI Error:", error.message);
        res.status(500).json({ error: "Failed to fetch processed data" });
    }
});

// 3️⃣ **Generate Explanation from Gemini AI**
app.post("/response/:image_id", async (req, res) => {
    const { image_id } = req.params;

    try {
        // Fetch AI-generated explanation from FastAPI
        const { data: responseData } = await axios.post(`${FASTAPI_URL}/response/${image_id}`);

        res.json(responseData);
    } catch (error) {
        console.error("FastAPI Error:", error.message);
        res.status(500).json({ error: "Failed to generate AI response" });
    }
});

// Run Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Express server running on port ${PORT}`));
