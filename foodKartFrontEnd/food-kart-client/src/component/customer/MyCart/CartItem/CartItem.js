import React from "react";

const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
    return (
        <div className="flex items-center gap-4 border p-4 rounded-md shadow">
            <img
                src={item.imageUrl}
                alt="Food"
                className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 space-y-1">
                <div className="text-lg font-semibold">{item?.foodName}</div>
                <div className="text-gray-600 text-sm">{item?.foodDescription}</div>
                <div>Selling Price: ${item.sellingPrice.toFixed(2)}</div>
                <div>
                    Total Price: ${(item.sellingPrice * item.quantity).toFixed(2)}
                </div>
                <div>
                    Quantity:
                    <select
                        className="ml-2 border rounded px-2 py-1"
                        value={item.quantity}
                        onChange={(e) =>
                            handleQuantityChange(item.foodId, parseInt(e.target.value))
                        }
                    >
                        {[1, 2, 3, 4, 5].map((q) => (
                            <option key={q} value={q}>
                                {q}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                onClick={() => handleRemoveItem(item.foodId)}
                className="text-blue-600 hover:underline font-semibold"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;
