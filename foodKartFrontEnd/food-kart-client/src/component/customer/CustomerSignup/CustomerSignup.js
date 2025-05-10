import React, { useState } from "react";
import axios from "axios";

const CustomerSignup = ({setLoadingComponentName}) => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        mobile: "",
        password: "",
        address: "",
        pincode: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); // For error messages
    const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission state
    const [successMessage, setSuccessMessage] = useState(""); // To display success message
    // Hook to handle redirection to login page

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleReset = () => {
        setFormData({
            email: "",
            name: "",
            mobile: "",
            password: "",
            address: "",
            pincode: ""
        });
        setErrorMessage(""); // Reset error message
        setSuccessMessage(""); // Reset success message
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(""); // Reset error message
        setSuccessMessage(""); // Reset success message

        try {
            const response = await axios.post("http://localhost:9192/customer/create-customer", formData);

            if (response.status === 200) {
                if (response.data === formData.email + " already exists!") {
                    setSuccessMessage(
                        `${formData.email} already exists! Please click the "Login" button to log in.`
                    );
                } else {
                    setSuccessMessage("Registration successful! Please login to continue.");
                    setFormData({
                        email: "",
                        name: "",
                        mobile: "",
                        password: "",
                        address: "",
                        pincode: ""
                    }); // Reset the form
                }
            }
        } catch (error) {
            setErrorMessage("Failed to register. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLoginRedirect = () => {
        setLoadingComponentName('customerSignup');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Customer Signup</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                {errorMessage && (
                    <div className="text-red-600 bg-red-100 p-2 rounded-md">
                        {errorMessage} <a href="/login" className="text-blue-600 hover:underline">Login</a>
                    </div>
                )}
                {successMessage && (
                    <div className="text-green-600 bg-green-100 p-2 rounded-md">
                        {successMessage}
                        {formData.email && (
                            <button
                                type="button"
                                onClick={handleLoginRedirect}
                                className="text-blue-600 hover:underline ml-2"
                            >
                                Login
                            </button>
                        )}
                    </div>
                )}
                <table className="w-full">
                    <tbody>
                    <tr>
                        <td className="p-2"><label htmlFor="email" className="block font-medium">Email</label></td>
                        <td><input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your email"
                        /></td>
                    </tr>
                    <tr>
                        <td className="p-2"><label htmlFor="name" className="block font-medium">Name</label></td>
                        <td><input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your name"
                        /></td>
                    </tr>
                    <tr>
                        <td className="p-2"><label htmlFor="mobile" className="block font-medium">Mobile</label></td>
                        <td><input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your mobile number"
                        /></td>
                    </tr>
                    <tr>
                        <td className="p-2"><label htmlFor="password" className="block font-medium">Password</label></td>
                        <td><input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your password"
                        /></td>
                    </tr>
                    <tr>
                        <td className="p-2"><label htmlFor="address" className="block font-medium">Address</label></td>
                        <td><input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your address"
                        /></td>
                    </tr>
                    <tr>
                        <td className="p-2"><label htmlFor="pincode" className="block font-medium">Pincode</label></td>
                        <td><input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your pincode"
                        /></td>
                    </tr>
                    </tbody>
                </table>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white py-2 px-6 rounded-md font-semibold ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Sign Up"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-300 text-black py-2 px-6 rounded-md font-semibold"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerSignup;
