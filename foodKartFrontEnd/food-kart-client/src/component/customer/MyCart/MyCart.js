import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomerContext } from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";
import DeliveryAddressForm from "./DeliveryAddressForm/DeliveryAddressForm";
import PreviewCartItem from "./PreviewCartItem/PreviewCartItem";
import CartItem from "./CartItem/CartItem";

const MyCart = () => {
    const [cartItemData, setCartItemData] = useState([]);
    const { customerEmail } = useContext(CustomerContext);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [confirmedOrderId, setConfirmedOrderId] = useState(null);

    const [addressForm, setAddressForm] = useState({
        customerName: "",
        mobile: "",
        pincode: "",
        deliveryAddress: "",
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
        fetchMyCartDataFromBackend().then(setCartItemData);
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
            setCartItemData(updatedData);
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
            setCartItemData(updatedData);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const totalOrderPrice = cartItemData?.reduce(
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
            customerName: "",
            mobile: "",
            pincode: "",
            deliveryAddress: "",
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!addressForm.customerName.trim()) newErrors.customerName = "Full Name is required";
        if (!/^\d{10}$/.test(addressForm.mobile.trim())) newErrors.mobile = "Mobile Number must be exactly 10 digits";
        if (!/^\d{6}$/.test(addressForm.pincode.trim())) newErrors.pincode = "Pincode must be exactly 6 digits";
        if (!addressForm.deliveryAddress.trim()) newErrors.deliveryAddress = "Delivery Address is required";
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
                foodDetails: cartItemData?.map(item => ({
                    foodId: item.foodId,
                    quantity: item.quantity,
                    soldPrice: item.sellingPrice
                })),
                customerName: addressForm.customerName,
                mobile: addressForm.mobile,
                pincode: addressForm.pincode,
                deliveryAddress: addressForm.deliveryAddress
            };

            const response = await axios.post("http://localhost:9192/prepare-order/create-prepared-order", payload);

            setConfirmedOrderId(response.data?.orderId || null);
            setOrderConfirmed(true);
            setCartItemData([]); // Clear cart after confirmation
        } catch (error) {
            console.error("Error confirming order:", error);
            alert("Failed to confirm order. Please try again.");
        }
    };

    const showOrderConfirmationMessage = () => {
        return (
            <div className="w-full text-center py-10">
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                    Order confirmed successfully!
                </h2>
                {confirmedOrderId && (
                    <p className="text-lg">
                        Your Order ID is:{" "}
                        <a
                            href={`/order-details/${confirmedOrderId}`}
                            className="text-blue-600 underline"
                        >
                            {confirmedOrderId}
                        </a>
                    </p>
                )}
            </div>
        );
    };

    const showEmptyCartMessage = () => {
        return (
            <div className="w-full text-center py-10">
                <h2 className="text-xl font-semibold text-red-600">
                    Sorry! No item in your cart. Please add any items.
                </h2>
            </div>
        );
    };

    const showCartItemDetails = () => {
        return (
            <>
                {cartItemData?.map((item) => (
                    <CartItem
                        key={item.cartId}
                        item={item}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                    />
                ))}

                <DeliveryAddressForm
                    totalOrderPrice={totalOrderPrice}
                    addressForm={addressForm}
                    errors={errors}
                    handleFormChange={handleFormChange}
                    handlePreviewOrder={handlePreviewOrder}
                    handleResetAddress={handleResetAddress}
                />

            </>
        );
    };

    const showCartItem = () => {
        return (
            <div className="flex-1 space-y-4">
                {!isPreviewing
                    ? showCartItemDetails()
                    : (
                        <PreviewCartItem
                            cartItemData={cartItemData}
                            totalOrderPrice={totalOrderPrice}
                            addressForm={addressForm}
                            handleEdit={handleEdit}
                            handleConfirmOrder={handleConfirmOrder}
                        />
                    )
                }
            </div>
        );
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start p-4 gap-4">
            {orderConfirmed && showOrderConfirmationMessage() }

            { cartItemData?.length === 0
                ? showEmptyCartMessage()
                : showCartItem()
            }
        </div>
    );
};

export default MyCart;



