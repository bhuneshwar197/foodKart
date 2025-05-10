import React, { useState } from "react";
import CustomerSignup from "../CustomerSignup/CustomerSignup";
import CustomerLogin from "../CustomerLogin/CustomerLogin";

const CustomerNotLoginOrSignedUp = () => {
    const [view, setView] = useState(null); // 'signup' or 'login'

    if (view === "signup") return <CustomerSignup />;
    if (view === "login") return <CustomerLogin />;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
                You are not logged in or signed up
            </h2>
            <p className="text-gray-700 text-lg mb-6">
                Please click
                <button
                    onClick={() => setView("signup")}
                    className="text-blue-600 font-medium mx-1 underline hover:text-blue-800"
                >
                    SignUp
                </button>
                or
                <button
                    onClick={() => setView("login")}
                    className="text-blue-600 font-medium mx-1 underline hover:text-blue-800"
                >
                    Login
                </button>
                to continue.
            </p>
        </div>
    );
};

export default CustomerNotLoginOrSignedUp;
