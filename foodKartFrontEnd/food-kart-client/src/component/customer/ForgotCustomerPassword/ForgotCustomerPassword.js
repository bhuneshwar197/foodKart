import React, { useState } from "react";
import axios from "axios";
import ResetCustomerPassword from "../ResetCustomerPassword/ResetCustomerPassword";
// import { useHistory } from "react-router-dom"; // For navigation to reset password page


const styles = {
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    }
};
const ForgotCustomerPassword = () => {
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP has been sent
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
    const [otpError, setOtpError] = useState(""); // Track OTP error message

    // const history = useHistory(); // To redirect to the reset password page

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleReset = () => {
        setEmail("");
        setOtp("");
        setErrorMessage("");
        setOtpError("");
        setIsOtpSent(false);
    };

    const handleGetOtp = async () => {
        setErrorMessage(""); // Clear previous error message
        if (!email) {
            setErrorMessage("Please enter a valid email.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axios.get(`http://localhost:9192/customer/send-customer-email-otp/${email}`);
            if (response.status === 200) {
                setIsOtpSent(true); // OTP sent successfully
            }
        } catch (error) {
            setErrorMessage("Failed to send OTP. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitOtp = async (e) => {
        e.preventDefault();

        setOtpError(""); // Clear OTP error message
        if (!otp) {
            setOtpError("Please enter the OTP.");
            return;
        }

        try {
            setIsSubmitting(true);
            // Call the backend to validate OTP
            const response = await axios.post(`http://localhost:9192/customer/verify-customer-email-otp`, { email, otp });

            if (response.status === 200 && response.data === "OTP is valid") {
                // setLoadingComponentName('resetCustomerPassword');
                setIsOtpVerified(true)
                // history.push("/reset-password"); // Redirect to reset password component
            } else {
                setOtpError("Invalid OTP. Please try again.");
            }
        } catch (error) {
            setOtpError("Error verifying OTP. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Forgot Customer Password</h2>
            {
                !isOtpVerified && (
                    <form onSubmit={handleSubmitOtp} className="w-full max-w-md space-y-4">
                        {errorMessage && (
                            <div className="text-red-600 bg-red-100 p-2 rounded-md">
                                {errorMessage}
                            </div>
                        )}

                        {isOtpSent && (
                            <div className="text-green-600 bg-green-100 p-2 rounded-md">
                                OTP sent to {email}. Please enter the OTP.
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter your email"
                            />

                            <button
                                type="button"
                                onClick={handleGetOtp}
                                style={styles.button}
                                disabled={isSubmitting}
                            >
                                {/*{isSubmitting ? "Sending OTP..." : "Get OTP"}*/}
                                {"Get OTP"}
                            </button>

                        </div>

                        {isOtpSent && (
                            <div>
                                <label htmlFor="otp" className="block font-medium">Enter OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Enter the OTP"
                                />

                                <button
                                    type="submit"
                                    style={styles.button}
                                    // disabled={isSubmitting || !isOtpSent}
                                >
                                    {"Submit OTP"}
                                </button>

                            </div>
                        )}

                        {otpError && (
                            <div className="text-red-600 bg-red-100 p-2 rounded-md">
                                {otpError}
                            </div>
                        )}

                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                onClick={handleReset}
                                style={styles.button}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                )
            }

            {isOtpVerified && (
                <ResetCustomerPassword
                    email={email}
                />
            )}

        </div>
    );
};

export default ForgotCustomerPassword;
