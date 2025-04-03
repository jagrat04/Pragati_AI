import tensorflow as tf
import numpy as np
from PIL import Image
import io

class ModelPipeline:
    def __init__(self):
        """Load all models at once when the pipeline starts."""
        self.classifier = tf.keras.models.load_model("./models/plant_soil_classifier.keras")
        self.soil_regressor = tf.keras.models.load_model("./models/soil.keras")
        self.plant_disease = tf.keras.models.load_model("./models/plant.keras")

    def preprocess_image(self, image_bytes,size):
        """Preprocess image for all models (Resize & Normalize)."""
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((size, size))
        image = np.array(image) / 255.0
        return np.expand_dims(image, axis=0)

    def process_image(self, image_bytes):
        """Handles the full pipeline: Classify → Run Soil or Plant Model → Return Output"""
        image = self.preprocess_image(image_bytes,150)
        
        # Step 1: Classify as Soil (0) or Plant (1)
        classification_pred = self.classifier.predict(image)[0]
        
        if len(classification_pred) == 1:  # Sigmoid case
            class_1_prob = float(classification_pred[0])
            class_0_prob = 1 - class_1_prob
        else:  # Softmax case
            class_0_prob = float(classification_pred[0])
            class_1_prob = float(classification_pred[1])

        predicted_class = int(class_1_prob > 0.5)

        classification_result = {
            "class": predicted_class,
            "confidence": max(class_0_prob, class_1_prob),
            "probabilities": {"soil": class_0_prob, "plant": class_1_prob}
        }
        
        image = self.preprocess_image(image_bytes,224)

        # Step 2: Run Soil Regression if Soil, else Run Plant Disease Model
        if predicted_class == 0:  # Soil
            prediction = self.soil_regressor.predict(image)
            additional_data = {
                "nitrogen": float(prediction[0][0]),
                "phosphorus": float(prediction[0][1]),
                "potassium": float(prediction[0][2]),
                "ph": float(prediction[0][3])
            }
            return {"type": "Soil", "classification": classification_result, "soil_analysis": additional_data}

        else:  # Plant
            prediction = self.plant_disease.predict(image)[0]
            disease_classes = [
        "American Bollworm on Cotton",
        "Anthracnose on Cotton",
        "Army worm",
        "Becterial Blight in Rice",
        "Brownspot",
        "Common_Rust",
        "Cotton Aphid",
        "Flag Smut",
        "Gray_Leaf_Spot",
        "Healthy Maize",
        "Healthy Wheat",
        "Healthy cotton",
        "Leaf Curl",
        "Leaf smut",
        "Mosaic sugarcane",
        "RedRot sugarcane",
        "RedRust sugarcane",
        "Rice Blast",
        "Sugarcane Healthy",
        "Tungro",
        "Wheat Brown leaf Rust",
        "Wheat Stem fly",
        "Wheat aphid",
        "Wheat black rust",
        "Wheat leaf blight",
        "Wheat mite",
        "Wheat powdery mildew",
        "Wheat scab",
        "Wheat___Yellow_Rust",
        "Wilt",
        "Yellow Rust Sugarcane",
        "bacterial_blight in Cotton",
        "bollrot on Cotton",
        "bollworm on Cotton",
        "cotton mealy bug",
        "cotton whitefly",
        "maize ear rot",
        "maize fall armyworm",
        "maize stem borer",
        "pink bollworm in cotton",
        "red cotton bug",
        "thirps on  cotton"
    ]
            predicted_label = disease_classes[np.argmax(prediction)]

            additional_data = {
                "disease": predicted_label,
                "confidence": float(np.max(prediction)),
                "probabilities": {disease_classes[i]: float(pred) for i, pred in enumerate(prediction)}
            }
            return {"type": "Plant", "classification": classification_result, "disease_analysis": additional_data}
