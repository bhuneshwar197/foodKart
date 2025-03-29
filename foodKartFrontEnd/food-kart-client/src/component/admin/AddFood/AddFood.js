import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const AddFood = () => {
    const [formData, setFormData] = useState({
        foodId: "",
        foodName: "",
        sellingPrice: "",
        description: "",
        image: "", // Stores Base64 image
        qty: "",
        category: "",
        type: "",
        cartLimit: "",
        rating1: 1,
        rating2: 2,
        rating3: 3,
        rating4: 4,
        rating5: 5,
    });

    const categories = ["Veg", "Non-Veg"];
    const types = ["Breakfast", "Lunch", "Dinner"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > 1024 * 1024 * 5) {  // ✅ Limit file size to 5MB
                alert("File is too large! Please select an image < 5MB.");
                return;
            }

            // ✅ Compress Image before converting to Base64
            const options = { maxSizeMB: 1, maxWidthOrHeight: 500, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);

            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result.split(",")[1] }); // ✅ Remove Base64 prefix
            };
        }
    };

    // Handle Image Upload
    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             setFormData({ ...formData, image: reader.result.split(",")[1] }); // Remove Base64 prefix
    //         };
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    foodId: "", foodName: "", sellingPrice: "", description: "",
                    //image: "",
                    qty: "", category: "", type: "", cartLimit: "",
                    rating1: 1, rating2: 2, rating3: 3, rating4: 4, rating5: 5
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
            foodId: "",
            foodName: "",
            sellingPrice: "",
            description: "",
            // image: "",
            qty: "",
            category: "",
            type: "",
            cartLimit: "",
            rating1: 1,
            rating2: 2,
            rating3: 3,
            rating4: 4,
            rating5: 5,
        });
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center" }}>Add Food Item</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="foodId" value={formData.foodId} onChange={handleChange} placeholder="Food ID" required style={inputStyle} />
                <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} placeholder="Food Name" required style={inputStyle} />
                <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} placeholder="Selling Price" required style={inputStyle} />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required style={inputStyle}></textarea>

                {/* Image Upload */}
                {/*<input type="file" accept="image/*" onChange={handleImageUpload} required style={inputStyle} />*/}
                {/*{formData.image && (*/}
                {/*    <img src={`data:image/png;base64,${formData.image}`} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />*/}
                {/*)}*/}

                <input type="number" name="qty" value={formData.qty} onChange={handleChange} placeholder="Quantity" required style={inputStyle} />

                {/* Category Dropdown */}
                <select name="category" value={formData.category} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Type Dropdown */}
                <select name="type" value={formData.type} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select Type</option>
                    {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>

                <input type="number" name="cartLimit" value={formData.cartLimit} onChange={handleChange} placeholder="Cart Limit" required style={inputStyle} />

                {/* Buttons */}
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button type="submit" style={buttonStyle}>Submit</button>
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
