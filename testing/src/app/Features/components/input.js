"use client";

import { useState } from "react";

const CNNInputField = () => {
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [comment, setComment] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setProcessing(true);
        setComment("");

        // Simulating processing time
        setTimeout(() => {
          setProcessing(false);
          setComment("this is a dummy comment");
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-black " style={{ textAlign: "center", padding: "20px" , marginTop: "25px"}}>
         <h2 className="text-2xl font-semibold mb-2">Crop image CNN analasys for pest and deficiency</h2>
      {/* <h2 className="text-black">Upload an Image of crop for analasys</h2> */}
      <input type="file" accept="image/*" onChange={handleImageUpload} className=" text-black" />

      {image && (
        <div style={{ marginTop: "20px" }}>
          <img src={image} alt="Uploaded" style={{ width: "200px", borderRadius: "10px" }} />
        </div>
      )}

      {processing && <p className=" text-black">Processing...</p>}
      {comment && <p>{comment}</p>}
    </div>
  );
};

export default CNNInputField;