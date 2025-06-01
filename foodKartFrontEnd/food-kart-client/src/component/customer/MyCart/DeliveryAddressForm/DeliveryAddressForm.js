import React from "react";

const DeliveryAddressForm = ({
                             totalOrderPrice,
                             addressForm,
                             errors,
                             handleFormChange,
                             handlePreviewOrder,
                             handleResetAddress,
                         }) => {
    return (
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

            <p className="text-gray-700 font-medium mb-1">
                Please fill the below delivery address
            </p>

            <table className="w-full table-auto border-spacing-y-3 border-separate">
                <tbody>
                {[
                    { label: "Full Name", name: "customerName" },
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
                                className={`w-full border rounded px-3 py-2 ${
                                    errors[name] ? "border-red-500" : "border-gray-300"
                                }`}
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
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={addressForm.deliveryAddress}
                  onChange={handleFormChange}
                  placeholder="Delivery Address"
                  rows="3"
                  className={`w-full border rounded px-3 py-2 ${
                      errors.deliveryAddress
                          ? "border-red-500"
                          : "border-gray-300"
                  }`}
              />
                        {errors.deliveryAddress && (
                            <p className="text-sm mt-1 text-red-600">
                                {errors.deliveryAddress}
                            </p>
                        )}
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handlePreviewOrder}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-bold shadow"
                >
                    Preview Order
                </button>
                <button
                    onClick={handleResetAddress}
                    className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-6 rounded-md font-medium"
                >
                    Reset Address
                </button>
            </div>
        </div>
    );
};

export default DeliveryAddressForm;
