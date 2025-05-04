import React, {useContext, useState} from "react";
import axios from "axios";
import {CustomerContext} from "../../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

const FoodTable = ({ foods }) => {
    const [quantities, setQuantities] = useState({});
    const {customerEmail} =  useContext(CustomerContext);

    const handleQuantityChange = (foodId, value) => {
        setQuantities((prev) => ({
            ...prev,
            [foodId]: Number(value),
        }));
    };

    const handleAddToCart = async (food) => {
        const quantity = quantities[food.foodId] || 1;

        const cartItem = {
            email: customerEmail,
            foodId: food.foodId,
            quantity: quantity,
            insertedDate: "2024-03-26",
            // sellingPrice: food.sellingPrice,
        };

        try {
            await axios.post("http://localhost:9192/cart/create-cart", cartItem);
            alert(`Added ${quantity} x ${food.foodName} to cart.`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add to cart.");
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {foods.map((food) => (
                <div
                    key={food.id}
                    className="border rounded-2xl shadow-md p-4 flex flex-col"
                >
                    <img
                        src={food.image || "https://via.placeholder.com/150?text=No+Image"}
                        alt={food.foodName}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <a
                        href={`/food/${food.foodId}`}
                        className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                        {food.foodName}
                    </a>
                    <p className="text-green-600 font-bold mt-1">${food.sellingPrice}</p>
                    <p className="text-gray-700 mt-2 text-sm">{food.description}</p>
                    <div className="mt-3 text-sm text-gray-600">
                        <p><strong>Category:</strong> {food.category}</p>
                        <p><strong>Type:</strong> {food.type}</p>
                    </div>

                    {/* Quantity Dropdown */}
                    <label className="mt-3 text-sm font-medium">Select Quantity:</label>
                    <select
                        className="mt-1 border rounded px-2 py-1"
                        value={quantities[food.foodId] || 1}
                        onChange={(e) => handleQuantityChange(food.foodId, e.target.value)}
                    >
                        {[...Array(food.cartLimit).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <br/>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => handleAddToCart(food)}
                        // className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FoodTable;
