import React from "react";

const PreviewCartItem = ({
                             cartItemData,
                             totalOrderPrice,
                             addressForm,
                             handleEdit,
                             handleConfirmOrder,
                         }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Preview Order</h2>

            {cartItemData?.map((item) => (
                <div
                    key={item.cartId}
                    className="border p-4 rounded-md shadow space-y-1"
                >
                    <div className="font-semibold">{item.foodName}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Unit Price: ${item.sellingPrice.toFixed(2)}</div>
                    <div>Total: ${(item.quantity * item.sellingPrice).toFixed(2)}</div>
                </div>
            ))}

            <div className="mt-4 border-t pt-2 font-bold">
                Total Order Price: ${totalOrderPrice.toFixed(2)}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-1">Delivery Address</h3>
                <p>
                    <strong>Name:</strong> {addressForm.customerName}
                </p>
                <p>
                    <strong>Mobile:</strong> {addressForm.mobile}
                </p>
                <p>
                    <strong>Pincode:</strong> {addressForm.pincode}
                </p>
                <p>
                    <strong>Address:</strong> {addressForm.deliveryAddress}
                </p>
            </div>

            <div className="mt-4 flex gap-4">
                <button
                    onClick={handleEdit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
                >
                    Edit
                </button>
                <button
                    onClick={handleConfirmOrder}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default PreviewCartItem;
