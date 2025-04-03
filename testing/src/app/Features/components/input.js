"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import axios from "axios";


const CNNInputField = () => {
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [comment, setComment] = useState("");
  const { translations } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageProcessing = () => {
    setProcessing(true);
    setComment("");

    // Simulating processing time
    setTimeout(() => {
      setProcessing(false);
      setComment(`Your apple plant is facing Apple Black Rot, a fungal disease caused by the pathogen Neofabraea malicorticis. It primarily affects apples and causes black lesions on the fruit, often leading to the fruit rotting. This disease is most common in humid climates and can spread rapidly if not managed properly.\n

After diagnosing the issue, I would suggest the following steps:\n

1. Remove Infected Fruit and Plant Debris:\n
Carefully remove any affected apples, leaves, and other plant debris to reduce the spread of the disease. Make sure to dispose of them away from the orchard.\n
2. Pruning:\n
Prune the tree to improve air circulation, which helps reduce the humidity levels around the plant and makes it less favorable for fungal growth.\n
3. Fungicide Application:\n
Apply a fungicide that is effective against fungal diseases like Neofabraea malicorticis. Copper-based fungicides or those containing chlorothalonil can help manage black rot. Be sure to follow the manufacturer's instructions for application timing and dosage.\n
4. Proper Watering and Drainage:\n
Ensure that your orchard has good drainage to avoid standing water around the base of the tree, as this can promote fungal growth. Water the trees at the base to avoid wetting the foliage.\n
5. Monitor for Further Symptoms:\n
Regularly check your plants for any new signs of infection. If more black rot lesions appear, additional treatments or interventions may be required.`);
    }, 2000);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file)); // Show preview immediately
    setComment(""); // Reset any previous comments
    setProcessing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
        // 1️⃣ Upload Image
        const uploadResponse = await axios.post("http://localhost:3000/input", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Upload success:", uploadResponse.data);
        const { image_id } = uploadResponse.data;

        // 2️⃣ Fetch Processed Result
        const processResponse = await axios.get(`http://localhost:3000/process/${image_id}`);
        console.log("Processing result:", processResponse.data);

        // 3️⃣ Fetch AI Explanation from Gemini
        const responseResponse = await axios.post(`http://localhost:3000/response/${image_id}`);
        console.log("AI-generated response:", responseResponse.data);

        // 4️⃣ Display AI Response
        setComment(responseResponse.data.response_text || "No explanation available.");
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
    } finally {
        setProcessing(false);
    }
};

  

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        handleImageProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-l from-[#d4fc79] to-[#96e6a1] shadow-md rounded-lg p-6 text-black flex flex-col items-center mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">{translations.analysis}</h2>

      {/* Drag and Drop / Upload Area */}
      <label
        htmlFor="file-upload"
        className="border-2 border-dashed border-gray-400 rounded-lg p-10 w-full max-w-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
        ) : (
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg"
              alt="Upload Icon"
              className="w-12 h-12 mb-2 opacity-50"
            />
            <p className="text-gray-700">
              Drag an image here or <span className="text-blue-500 underline">upload a file</span>
            </p>
          </>
        )}
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {processing && <p className="mt-2 text-black">Processing...</p>}
      {comment && <p className="mt-2">{comment}</p>}
    </div>
  );
};

export default CNNInputField;
