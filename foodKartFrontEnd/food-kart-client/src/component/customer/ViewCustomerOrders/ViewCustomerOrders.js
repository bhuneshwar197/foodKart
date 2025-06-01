import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CustomerContext } from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";
import Grid from '@mui/material/Grid';


const style = {
   image: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid black" },
   foodDetail: {
    border: "2px solid black",
    borderRadius: '8px',
   },
   foodContainer: {
    marginTop: '8px',
   },
   orderContainer: {
    marginTop: '8px',
   },
};

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
                    <div key={order.orderId} className="border rounded-xl p-4 mb-6 shadow-md" style={style.orderContainer}>
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
                                {order.foodDetails.map((food, index) => (
//                                    <li key={index} className="border p-3 rounded bg-gray-50">
//                                        <p><strong>Food ID:</strong> {item.foodId}</p>
//                                        <p><strong>Quantity:</strong> {item.quantity}</p>
//                                        <p><strong>Unit Price:</strong> ${item.soldPrice.toFixed(2)}</p>
//                                        <p><strong>Total Price for this item:</strong> Quantity x Price = ${(item.quantity * item.soldPrice).toFixed(2)}</p>
//                                    </li>

<Grid container spacing={2} style={style.foodContainer}>

                    <Grid item xs={12} md={3} >
                        <div style={style.image} >
                            <img
                                src={food.imageUrl || "https://via.placeholder.com/150?text=No+Image"}
                                alt={food.foodName}
                                style={style.image}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <div className="col-span-9 bg-white p-4" style={style.foodDetail}>
                            <div className="flex flex-col justify-between flex-1">
                            <div>
                                <label><b> {food.foodName}</b> </label>
                                <div className="text-green-600 font-bold"><strong>Price:</strong> ${food.soldPrice}</div>
                                <div className="text-gray-700 text-sm">{food.description}</div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div><strong>Category:</strong> {food.category}</div>
                                    <div><strong>Type:</strong> {food.type}</div>
                                </div>
                                <div className="text-green-600 font-bold"><strong>Quantity: </strong> {food.quantity}</div>
                                <div>
                                  <strong>Price for this Item : </strong>
                                     ({food.soldPrice} x { food.quantity}) =  {food.soldPrice * food.quantity}
                                  </div>
                            </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>



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
