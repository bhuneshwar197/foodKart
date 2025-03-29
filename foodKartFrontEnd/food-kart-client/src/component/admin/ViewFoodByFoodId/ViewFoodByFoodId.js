import React, { useState } from "react";
import axios from "axios";

const buttonStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const ViewFoodByFoodId = () => {
    const [foodId, setFoodId] = useState("");
    const [foodData, setFoodData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchFood = async () => {
        setLoading(true);
        setError(null);
        setFoodData(null);

        try {
            const response = await axios.get(`http://localhost:9192/food/get-food-by-food-id/${foodId}`);

            if (!response.data || Object.keys(response.data).length === 0) {
                setError("No food data found for the given ID.");
            } else {
                setFoodData(response.data);
            }
        } catch (err) {
            setError("Service failed! Unable to fetch food data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md max-w-lg mx-auto">
            <input
                type="text"
                placeholder="Enter Food ID"
                value={foodId}
                onChange={(e) => setFoodId(e.target.value)}
                className="block w-full p-2 border rounded mb-2"
            />

            <button onClick={fetchFood} style={{ ...buttonStyle, backgroundColor: "blue", marginLeft: "10px" }}>
                {loading ? "Loading..." : "Fetch Food"}
            </button>

            {loading && <p className="text-blue-500 mt-2">Loading...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {foodData && !loading && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <p><strong>Food ID:</strong> {foodData.foodId}</p>
                    <p><strong>Name:</strong> {foodData.foodName}</p>
                    <p><strong>Price:</strong> ${foodData.sellingPrice}</p>
                    <p><strong>Description:</strong> {foodData.description}</p>
                    <p><strong>Quantity:</strong> {foodData.qty}</p>
                    <p><strong>Category:</strong> {foodData.category}</p>
                    <p><strong>Type:</strong> {foodData.type}</p>
                    <p><strong>Cart Limit:</strong> {foodData.cartLimit}</p>
                    <p><strong>Ratings:</strong> {foodData.rating1}, {foodData.rating2}, {foodData.rating3}, {foodData.rating4}, {foodData.rating5}</p>
                    {foodData.image && (
                        <img
                            src={`data:image/jpeg;base64,${foodData.image}`}
                            alt="Food"
                            className="mt-2 w-32 h-32 object-cover border rounded"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewFoodByFoodId;
