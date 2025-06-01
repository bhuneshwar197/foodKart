import React from "react";
import Grid from '@mui/material/Grid';


const style = {
   image: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid black" },
   foodDetail: {
    border: "2px solid black",
    borderRadius: '8px',
   }
};

const PreviewCartItem = ({
                             foodData,
                             totalOrderPrice,
                             addressForm,
                             handleEdit,
                             handleConfirmOrder,
                         }) => {
    return (
     <div>
                <h2 className="text-2xl font-bold mb-2">Preview Order</h2>

{foodData?.map((food) => (

    <div
                key={food.foodId}
                className="border rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-4"
            >

                <Grid container spacing={2}>

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
                                    <a
                                        href={`/food/${food.foodId}`}
                                        className="text-2xl font-semibold text-blue-600 hover:underline"
                                    >
                                        {food.foodName}
                                    </a>
                                    <p className="text-green-600 font-bold mt-1">${food.sellingPrice}</p>
                                    <p className="text-gray-700 mt-2 text-sm">{food.description}</p>
                                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                                        <p><strong>Category:</strong> {food.category}</p>
                                        <p><strong>Type:</strong> {food.type}</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </Grid>
                </Grid>
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


//        <div>
//            <h2 className="text-2xl font-bold mb-2">Preview Order</h2>
//
//            {cartItemData?.map((item) => (
//                <div
//                    key={item.cartId}
//                    className="border p-4 rounded-md shadow space-y-1"
//                >
//                    <div className="font-semibold">{item.foodName}</div>
//                    <div>Quantity: {item.quantity}</div>
//                    <div>Unit Price: ${item.sellingPrice.toFixed(2)}</div>
//                    <div>Total: ${(item.quantity * item.sellingPrice).toFixed(2)}</div>
//                </div>
//            ))}
//
//            <div className="mt-4 border-t pt-2 font-bold">
//                Total Order Price: ${totalOrderPrice.toFixed(2)}
//            </div>
//
//            <div className="mt-6">
//                <h3 className="text-lg font-semibold mb-1">Delivery Address</h3>
//                <p>
//                    <strong>Name:</strong> {addressForm.customerName}
//                </p>
//                <p>
//                    <strong>Mobile:</strong> {addressForm.mobile}
//                </p>
//                <p>
//                    <strong>Pincode:</strong> {addressForm.pincode}
//                </p>
//                <p>
//                    <strong>Address:</strong> {addressForm.deliveryAddress}
//                </p>
//            </div>
//
//            <div className="mt-4 flex gap-4">
//                <button
//                    onClick={handleEdit}
//                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
//                >
//                    Edit
//                </button>
//                <button
//                    onClick={handleConfirmOrder}
//                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
//                >
//                    Confirm Order
//                </button>
//            </div>
//        </div>
    );
};

export default PreviewCartItem;
