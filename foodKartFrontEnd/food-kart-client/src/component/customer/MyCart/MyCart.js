import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomerContext } from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

const MyCart = () => {
    const [tableData, setTableData] = useState([]);
    const { customerEmail } = useContext(CustomerContext);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [confirmedOrderId, setConfirmedOrderId] = useState(null);

    const [addressForm, setAddressForm] = useState({
        customer_name: "",
        mobile: "",
        pincode: "",
        delivery_address: "",
    });

    const [errors, setErrors] = useState({});

    const fetchMyCartDataFromBackend = async () => {
        try {
            const response = await fetch("http://localhost:9192/cart/get-cart-by-email/" + customerEmail);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching Cart data`, error);
        }
    };

    useEffect(() => {
        fetchMyCartDataFromBackend().then(setTableData);
    }, []);

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
            const updatedData = await fetchMyCartDataFromBackend();
            setTableData(updatedData);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleRemoveItem = async (foodId) => {
        try {
            await axios.delete(`http://localhost:9192/cart/delete-cart-by-email-and-food-id`, {
                params: { email: customerEmail, foodId },
            });
            const updatedData = await fetchMyCartDataFromBackend();
            setTableData(updatedData);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const totalOrderPrice = tableData.reduce(
        (acc, item) => acc + item.sellingPrice * item.quantity,
        0
    );

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === "mobile" || name === "pincode") {
            const filteredValue = value.replace(/\D/g, '');
            if (name === "mobile" && filteredValue.length <= 10) {
                setAddressForm(prev => ({ ...prev, [name]: filteredValue }));
            } else if (name === "pincode" && filteredValue.length <= 6) {
                setAddressForm(prev => ({ ...prev, [name]: filteredValue }));
            }
        } else {
            setAddressForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleEdit = () => setIsPreviewing(false);

    const handleResetAddress = () => {
        setAddressForm({
            customer_name: "",
            mobile: "",
            pincode: "",
            delivery_address: "",
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!addressForm.customer_name.trim()) newErrors.customer_name = "Full Name is required";
        if (!/^\d{10}$/.test(addressForm.mobile.trim())) newErrors.mobile = "Mobile Number must be exactly 10 digits";
        if (!/^\d{6}$/.test(addressForm.pincode.trim())) newErrors.pincode = "Pincode must be exactly 6 digits";
        if (!addressForm.delivery_address.trim()) newErrors.delivery_address = "Delivery Address is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePreviewOrder = () => {
        if (validateForm()) {
            setIsPreviewing(true);
        } else {
            setTimeout(() => {
                const firstErrorField = Object.keys(errors)[0];
                const el = document.getElementById(firstErrorField);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 0);
        }
    };

    const handleConfirmOrder = async () => {
        try {
            const payload = {
                email: customerEmail,
                foodDetails: tableData.map(item => ({
                    foodId: item.foodId,
                    quantity: item.quantity,
                    soldPrice: item.sellingPrice
                })),
                customerName: addressForm.customer_name,
                mobile: addressForm.mobile,
                pincode: addressForm.pincode,
                deliveryAddress: addressForm.delivery_address
            };

            const response = await axios.post("http://localhost:9192/prepare-order/create-prepared-order", payload);

            setConfirmedOrderId(response.data?.orderId || null);
            setOrderConfirmed(true);
            setTableData([]); // Clear cart after confirmation
        } catch (error) {
            console.error("Error confirming order:", error);
            alert("Failed to confirm order. Please try again.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start p-4 gap-4">
            {orderConfirmed ? (
                <div className="w-full text-center py-10">
                    <h2 className="text-2xl font-bold text-green-600 mb-2">Order confirmed successfully!</h2>
                    {confirmedOrderId && (
                        <p className="text-lg">
                            Your Order ID is:{" "}
                            <a href={`/order-details/${confirmedOrderId}`} className="text-blue-600 underline">
                                {confirmedOrderId}
                            </a>
                        </p>
                    )}
                </div>
            ) : tableData.length === 0 ? (
                <div className="w-full text-center py-10">
                    <h2 className="text-xl font-semibold text-red-600">
                        Sorry! No item in your cart. Please add any items.
                    </h2>
                </div>
            ) : (
                <>
                    {/* CART ITEMS */}
                    <div className="flex-1 space-y-4">
                        {isPreviewing ? (
                            <>
                                <h2 className="text-2xl font-bold mb-2">Preview Order</h2>
                                {tableData.map(item => (
                                    <div key={item.cartId} className="border p-4 rounded-md shadow space-y-1">
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
                                    <p><strong>Name:</strong> {addressForm.customer_name}</p>
                                    <p><strong>Mobile:</strong> {addressForm.mobile}</p>
                                    <p><strong>Pincode:</strong> {addressForm.pincode}</p>
                                    <p><strong>Address:</strong> {addressForm.delivery_address}</p>
                                </div>
                                <div className="mt-4 flex gap-4">
                                    <button onClick={handleEdit} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md">Edit</button>
                                    <button onClick={handleConfirmOrder} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md">Confirm Order</button>
                                </div>
                            </>
                        ) : (
                            <>
                                {tableData.map(item => (
                                    <div key={item.cartId} className="flex items-center gap-4 border p-4 rounded-md shadow">
                                        <img src={item.foodImage || "https://via.placeholder.com/80"} alt="Food" className="w-20 h-20 object-cover rounded" />
                                        <div className="flex-1 space-y-1">
                                            <div className="text-lg font-semibold">{item?.foodName}</div>
                                            <div className="text-gray-600 text-sm">{item?.foodDescription}</div>
                                            <div>Selling Price: ${item.sellingPrice.toFixed(2)}</div>
                                            <div>Total Price: ${(item.sellingPrice * item.quantity).toFixed(2)}</div>
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
                                        <button onClick={() => handleRemoveItem(item.foodId)} className="text-blue-600 hover:underline font-semibold">Remove</button>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    {/* FORM SECTION */}
                    {!isPreviewing && (
                        <div className="md:w-1/3 p-4 border rounded-md shadow h-fit sticky top-4 self-start space-y-4">
                            <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
                            <table className="w-full text-left border-spacing-y-3 border-separate">
                                <tbody>
                                <tr>
                                    <td className="font-medium text-lg">Total Price</td>
                                    <td className="text-green-600 font-semibold text-lg">
                                        ${totalOrderPrice.toFixed(2)}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <p className="text-gray-700 font-medium mb-1">Please fill the below delivery address</p>
                            <table className="w-full table-auto border-spacing-y-3 border-separate">
                                <tbody>
                                {[
                                    { label: "Full Name", name: "customer_name" },
                                    { label: "Mobile Number", name: "mobile" },
                                    { label: "Pincode", name: "pincode" },
                                ].map(({ label, name }) => (
                                    <tr key={name}>
                                        <td className="font-medium align-top pt-2">{label}</td>
                                        <td>
                                            <input
                                                id={name}
                                                name={name}
                                                value={addressForm[name]}
                                                onChange={handleFormChange}
                                                placeholder={label}
                                                className={`w-full border rounded px-3 py-2 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
                                            />
                                            {errors[name] && (
                                                <p className="text-sm mt-1 text-red-600">{errors[name]}</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="font-medium align-top pt-2">Delivery Address</td>
                                    <td>
                                            <textarea
                                                id="delivery_address"
                                                name="delivery_address"
                                                value={addressForm.delivery_address}
                                                onChange={handleFormChange}
                                                placeholder="Delivery Address"
                                                rows="3"
                                                className={`w-full border rounded px-3 py-2 ${errors.delivery_address ? "border-red-500" : "border-gray-300"}`}
                                            />
                                        {errors.delivery_address && (
                                            <p className="text-sm mt-1 text-red-600">{errors.delivery_address}</p>
                                        )}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-center gap-4">
                                <button onClick={handlePreviewOrder} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-bold shadow">Preview Order</button>
                                <button onClick={handleResetAddress} className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-6 rounded-md font-medium">Reset Address</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyCart;
