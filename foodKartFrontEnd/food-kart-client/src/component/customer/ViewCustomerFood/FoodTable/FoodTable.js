import React, { useContext, useState } from "react";
import axios from "axios";
import { CustomerContext } from "../../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";
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
   addToCartButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007BFF',
      color: 'white',
      cursor: 'pointer',
  },
};


const FoodTable = ({ foods, setLoadingComponentName }) => {
    const [quantities, setQuantities] = useState({});
    const { customerEmail } = useContext(CustomerContext);

    const handleQuantityChange = (foodId, value) => {
        setQuantities((prev) => ({
            ...prev,
            [foodId]: Number(value),
        }));
    };

    const handleAddToCart = async (food) => {
        if (!customerEmail) {
            setLoadingComponentName('customerNotLoginOrSignedUp');
        } else {
            const quantity = quantities[food.foodId] || 1;
            const cartItem = {
                email: customerEmail,
                foodId: food.foodId,
                quantity: quantity,
                insertedDate: "2024-03-26",
            };

            try {
                await axios.post("http://localhost:9192/cart/create-cart", cartItem);
                alert(`Added ${quantity} x ${food.foodName} to cart.`);
            } catch (error) {
                console.error("Error adding to cart:", error);
                alert("Failed to add to cart.");
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4">

            {foods.map((food) => (
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

                                {customerEmail && (
                                    <div className="mt-4 flex items-center gap-3">
                                        <label className="text-sm font-medium">Qty:</label>
                                        <select
                                            className="border rounded px-2 py-1"
                                            value={quantities[food.foodId] || 1}
                                            onChange={(e) => handleQuantityChange(food.foodId, e.target.value)}
                                        >
                                            {[...Array(food.cartLimit).keys()].map((i) => (
                                                <option key={i + 1} value={i + 1}>
                                                  {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="mt-4 flex items-center gap-3">
                                    <button
                                        onClick={() => handleAddToCart(food)}
                                        style={style.addToCartButton}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            ))}
        </div>
    );
};

export default FoodTable;
