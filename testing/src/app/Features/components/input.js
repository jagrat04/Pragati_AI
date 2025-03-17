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
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-l from-[#d4fc79] to-[#96e6a1] shadow-md rounded-lg p-4 text-black " style={{ textAlign: "center", padding: "20px" , marginTop: "25px"}}>
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