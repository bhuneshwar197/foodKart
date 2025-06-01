import React from "react";
import Grid from '@mui/material/Grid';


const style = {
   image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "8px",
      border: "1px solid black"
   },
   foodDetail: {
      border: "2px solid black",
      borderRadius: '8px',
   },
   removeItemButton: {
       padding: '10px 15px',
       border: 'none',
       borderRadius: '5px',
       backgroundColor: '#007BFF',
       color: 'white',
       cursor: 'pointer',
   },
};

const CartItem = ({ food, handleQuantityChange, handleRemoveItem }) => {

    return (
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
                                <label><b> {food.foodName}</b> </label>
                                <div className="text-green-600 font-bold"><strong>Price:</strong> ${food.sellingPrice}</div>
                                <div className="text-gray-700 text-sm">{food.description}</div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div><strong>Category:</strong> {food.category}</div>
                                    <div><strong>Type:</strong> {food.type}</div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                              <label className="text-sm font-medium">Qty:</label>

                                <select
                                    className="border rounded px-2 py-1"
                                    value={food.quantity}
                                    onChange={(e) => handleQuantityChange(food.foodId, e.target.value)}
                                >
                                    {[...Array(food.cartLimit).keys()].map((i) => (
                                        <option key={i + 1} value={i + 1}>
                                          {i + 1}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div><strong>Price for this Item : </strong> ({food.sellingPrice} x { food.quantity}) =  {food.sellingPrice * food.quantity} </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    onClick={() => handleRemoveItem(food.foodId)}
                                    style={style.removeItemButton}
                                >
                                    Remove Item
                                </button>

                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default CartItem;
