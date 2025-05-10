import { useState } from "react";
import axios from "axios";

const DeleteFoodByFoodId = () => {
    const [foodId, setFoodId] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const deleteFood = async () => {
        try {
            await axios.delete(`http://localhost:9192/food/delete-food-by-food-id/${foodId}`);
            setMessage("Food deleted successfully!");
            setError(null);
        } catch (err) {
            setMessage(null);
            setError("Failed to delete food. Please check the Food ID and try again.");
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
            <button onClick={deleteFood} className="w-full bg-blue-500 text-white p-2 rounded">
                Delete Food
            </button>

            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default DeleteFoodByFoodId;
