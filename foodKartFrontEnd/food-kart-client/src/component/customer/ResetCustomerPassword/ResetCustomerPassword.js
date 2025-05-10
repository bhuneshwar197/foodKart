import React, {useContext, useState} from 'react';
import axios from 'axios';
import {CustomerContext} from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

const ResetCustomerPassword = ({  email }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const handleReset = () => {
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setError('');
    };

    const handleUpdatePassword = async () => {
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:9192/customer/update-password`,
                {},
                {
                    params: {
                        email: email,
                        password: password
                    }
                }
            );

            if (response.status === 200) {
                setMessage("Password updated successfully! Please login and continue shopping");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Error updating password. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Reset Password</h2>

                {message && <h3 className="text-green-600 mb-3">{message}</h3>}
                {error && <div className="text-red-600 mb-3">{error}</div>}

                <div className="mb-4">
                    <label className="block font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter new password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Confirm new password"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleReset}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleUpdatePassword}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetCustomerPassword;
