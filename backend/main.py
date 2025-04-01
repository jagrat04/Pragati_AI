from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import google.generativeai as genai
import os
from dotenv import load_dotenv

app = FastAPI()

# Load CNN Model
model = tf.keras.models.load_model("./models/plant_soil_classifier.keras")
load_dotenv()
# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
# print("Loaded API Key:", API_KEY)  # Debugging

if not API_KEY:
    raise ValueError("API Key is missing. Set GEMINI_API_KEY in environment variables.")
genai.configure(api_key=API_KEY)
gemini_model = genai.GenerativeModel("gemini-pro")

# Storage for intermediate results (simulate a database)
image_store = {}
classification_store = {}

# Function to preprocess image
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# 1️⃣ **Image Upload Endpoint**
@app.post("/input")
async def upload_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    
    # Store image in a simulated DB (In production, save to disk or S3)
    image_id = file.filename
    image_store[image_id] = image_bytes

    return {"message": "Image received", "image_id": image_id}

# 2️⃣ **Process Image & Store Raw Data**
@app.post("/data/{image_id}")
async def process_image(image_id: str):
    if image_id not in image_store:
        return {"error": "Image not found"}

    # Preprocess and classify image
    image = preprocess_image(image_store[image_id])
    prediction = model.predict(image)[0]

    # Handle binary classification (sigmoid vs softmax)
    if len(prediction) == 1:  # Sigmoid activation case
        class_1_prob = float(prediction[0])
        class_0_prob = 1 - class_1_prob
    else:  # Softmax activation case
        class_0_prob = float(prediction[0])
        class_1_prob = float(prediction[1])

    predicted_class = int(class_1_prob > 0.5)

    raw_data = {
        "class": predicted_class,
        "confidence": max(class_0_prob, class_1_prob),
        "probabilities": {"class_0": class_0_prob, "class_1": class_1_prob}
    }

    # Store classification result
    classification_store[image_id] = raw_data

    return {"message": "Classification completed", "raw_data": raw_data}

# 3️⃣ **Generate Readable Response**
@app.post("/response/{image_id}")
async def generate_response(image_id: str):
    if image_id not in classification_store:
        return {"error": "Classification data not found"}

    raw_data = classification_store[image_id]
    
    prompt = f"Explain what it means when an image is classified as class {raw_data['class']} with {raw_data['confidence']*100:.2f}% confidence."
    try:
        response = gemini_model.generate_content(prompt)
        response_text = response.text if response else "No response from Gemini."
    except Exception as e:
        print("Gemini API Error:", e)
        response_text = "Error generating explanation."

    return {"message": "Response generated", "response_text": response_text}

# Run FastAPI Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
