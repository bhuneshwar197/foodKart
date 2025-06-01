import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const AddFood = () => {
    const [formData, setFormData] = useState({
        foodName: "",
        sellingPrice: "",
        description: "",
        imageUrl: "", // Will store Cloudinary image URL
        qty: "",
        category: "",
        type: "",
        cartLimit: "",
    });

    const [uploading, setUploading] = useState(false);

    const categories = ["Veg", "Non-Veg"];
    const types = ["Breakfast", "Lunch", "Dinner"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        };

        try {
            setUploading(true);
            const compressedFile = await imageCompression(file, options);

            const formDataImage = new FormData();
            formDataImage.append("file", compressedFile);
            formDataImage.append("upload_preset", "sakshi_image_upload"); // Replace this

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dgsjpttuu/image/upload", // Replace this
                {
                    method: "POST",
                    body: formDataImage,
                }
            );

            const data = await response.json();
            setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
            setUploading(false);
        } catch (error) {
            console.error("Image upload failed", error);
            alert("Image upload failed");
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imageUrl) {
            alert("Please upload an image first.");
            return;
        }

        try {
            const response = await fetch("http://localhost:9192/food/create-food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Food item created successfully!");
                setFormData({
                    foodName: "",
                    sellingPrice: "",
                    description: "",
                    imageUrl: "",
                    qty: "",
                    category: "",
                    type: "",
                    cartLimit: "",
                });
            } else {
                alert("Failed to create food item.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    const handleReset = () => {
        setFormData({
            foodName: "",
            sellingPrice: "",
            description: "",
            imageUrl: "",
            qty: "",
            category: "",
            type: "",
            cartLimit: "",
        });
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center" }}>Add Food Item</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} placeholder="Food Name" required style={inputStyle} />
                <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} placeholder="Selling Price" required style={inputStyle} />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required style={inputStyle}></textarea>

                <input type="number" name="qty" value={formData.qty} onChange={handleChange} placeholder="Quantity" required style={inputStyle} />

                <select name="category" value={formData.category} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select name="type" value={formData.type} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select Type</option>
                    {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>

                <input type="number" name="cartLimit" value={formData.cartLimit} onChange={handleChange} placeholder="Cart Limit" required style={inputStyle} />

                {/* Image Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    style={inputStyle}
                />
                {uploading && <p style={{ color: "orange", textAlign: "center" }}>Uploading image...</p>}
                {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" style={{ width: "100%", marginTop: "10px", borderRadius: "6px" }} />
                )}

                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button type="submit" style={buttonStyle} disabled={uploading}>Submit</button>
                    <button type="button" onClick={handleReset} style={{ ...buttonStyle, backgroundColor: "#ccc", marginLeft: "10px" }}>Reset</button>
                </div>
            </form>
        </div>
    );
};

// Styles
const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
};

const buttonStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

export default AddFood;
