import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CustomerContext } from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

const ViewCustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { customerEmail } = useContext(CustomerContext);

    useEffect(() => {
        if (!customerEmail) return;

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:9192/orders/get-customer-order-by-email/${customerEmail}`);
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [customerEmail]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Customer Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found for {customerEmail}</p>
            ) : (
                orders.map(order => (
                    <div key={order.orderId} className="border rounded-xl p-4 mb-6 shadow-md">
                        <p><strong>Order ID:</strong> {order.orderId}</p>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p><strong>Mobile:</strong> {order.mobile}</p>
                        <p><strong>Address:</strong> {order.deliveryAddress} - {order.pincode}</p>
                        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                        <p><strong>Ordered Date:</strong> {order.orderedDate}</p>

                        <p className="flex items-center gap-2">
                            <strong>Delivery Status:</strong>
                            <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
                                    order.deliveryStatus === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {order.deliveryStatus === "Delivered" ? "✅ Delivered" : "❌ Not Delivered"}
                            </span>
                        </p>



                        <p><strong>Delivery Date:</strong> {order.deliveryDate ?? 'Pending'}</p>
                        <div className="mt-3">
                            <h4 className="font-semibold mb-2">Food Items:</h4>
                            <ul className="space-y-2">
                                {order.foodDetails.map((item, index) => (
                                    <li key={index} className="border p-3 rounded bg-gray-50">
                                        <p><strong>Food ID:</strong> {item.foodId}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Unit Price:</strong> ${item.soldPrice.toFixed(2)}</p>
                                        <p><strong>Total Price for this item:</strong> Quantity x Price = ${(item.quantity * item.soldPrice).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ViewCustomerOrders;
