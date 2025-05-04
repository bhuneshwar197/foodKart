
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CustomerContext} from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

const MyCart = () => {

    const [tableData, setTableData] = useState([]);

    const fetchMyCartDataFromBackend = async () => {
        try {
            const response = await fetch("http://localhost:9192/cart/get-cart-by-email/" + customerEmail);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching Cart data `, error);
        }
    };

    useEffect(() => {
        setTableData([]);
        fetchMyCartDataFromBackend().then(setTableData);
    }, []);

    const [items, setItems] = useState(

    );

    const {customerEmail} =  useContext(CustomerContext);


    const handleQuantityChange = async (foodId, newQuantity) => {
        try {
            await axios.put(
                `http://localhost:9192/cart/update-cart-by-email-and-food-id`,
                {},
                {
                    params: {
                        email: customerEmail,
                        foodId,
                        quantity: newQuantity,
                    },
                }
            );

            // Refresh cart after successful update
            const updatedData = await fetchMyCartDataFromBackend();
            setTableData(updatedData);

        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveItem = async (foodId) => {
        try {
            await axios.delete(
                `http://localhost:9192/cart/delete-cart-by-email-and-food-id`,
                {
                    params: {
                        email: customerEmail,
                        foodId,
                    },
                }
            );

            // Refresh cart after successful removal
            const updatedData = await fetchMyCartDataFromBackend();
            setTableData(updatedData);

        } catch (error) {
            console.error("Error removing item:", error);
        }
    };


    return (
        <div className="p-4 space-y-4">
            {tableData?.map(item => (
                <div key={item.cartId} className="flex items-center gap-4 border p-4 rounded-md shadow">
                    <img
                        src={item.foodImage || "https://via.placeholder.com/80"}
                        alt="Food"
                        className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-1">
                        <div className="text-lg font-semibold">{item?.foodName || "Unnamed Item"}</div>
                        <div className="text-gray-600 text-sm">{item?.foodDescription || "No description available."}</div>
                        <div>Selling Price: ${item.sellingPrice.toFixed(2)}</div>
                        <div>
                            Total Price for {item?.foodName} : ${item.sellingPrice} × {item.quantity} = ${(item.sellingPrice * item.quantity).toFixed(2)}
                        </div>

                        <div>
                            Quantity:
                            <select
                                className="ml-2 border rounded px-2 py-1"
                                value={item.quantity}
                                onChange={e => handleQuantityChange(item.foodId, e.target.value)}
                            >
                                {[1, 2, 3, 4, 5].map(q => (
                                    <option key={q} value={q}>{q}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={() => handleRemoveItem(item.foodId)}
                        className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                        Remove Item From cart
                    </button>
                </div>
            ))}
        </div>


    );
};

export default MyCart;
