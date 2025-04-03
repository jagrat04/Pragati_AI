from fastapi import FastAPI, File, UploadFile
import os
from dotenv import load_dotenv
import google.generativeai as genai
from model_pipeline import ModelPipeline  # Import the module

app = FastAPI()

# Load Model Pipeline
pipeline = ModelPipeline()

# Load API Key from .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("API Key is missing. Set GEMINI_API_KEY in environment variables.")

# Configure Gemini API
genai.configure(api_key=API_KEY)
gemini_model = genai.GenerativeModel("gemini-2.0-flash")

# Storage for images and results
image_store = {}  # Stores raw image bytes
classification_store = {}  # Stores classification results

# 1️⃣ **Upload & Store Raw Image, Then Process**
@app.post("/input")
async def upload_image(file: UploadFile = File(...)):
    """Stores raw image & processes it using the model pipeline."""
    image_bytes = await file.read()
    image_id = file.filename  # Use filename as image ID
    image_store[image_id] = image_bytes  # Store raw image

    # Process image using the pipeline
    result = pipeline.process_image(image_bytes)

    # Store classification results
    classification_store[image_id] = result

    return {"message": "Image stored & processed", "image_id": image_id,  **result}

# 3️⃣ **Generate Readable Response Using Gemini**
@app.post("/response/{image_id}")
async def generate_response(image_id: str):
    """Generates a response using Gemini based on the full stored model output."""
    if image_id not in classification_store:
        return {"error": "Classification data not found"}

    result = classification_store[image_id]  # Get FULL result from pipeline

    # Convert result dictionary into a descriptive text prompt
    prompt = f"Explain the following data for soil nutrient and plant health for farmer and give solution for what is lacking\n{result}"

    try:
        response = gemini_model.generate_content(prompt)

        # Ensure response has text
        response_text = response.text if hasattr(response, "text") else "No response from Gemini."

        # Alternative way to extract content from Gemini
        if hasattr(response, "candidates") and response.candidates:
            response_text = response.candidates[0].content.parts[0].text if response.candidates[0].content.parts else response_text

    except Exception as e:
        print("Gemini API Error:", e)
        response_text = "Error generating explanation."

    return {"message": "Response generated", "response_text": response_text}

@app.get("/process/{image_id}")
async def get_processed_result(image_id: str):
    """Retrieve classification and analysis results."""
    if image_id not in classification_store:
        return {"error": "Classification data not found"}

    return {"message": "Processing complete", "result": classification_store[image_id]}


# Run FastAPI Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
