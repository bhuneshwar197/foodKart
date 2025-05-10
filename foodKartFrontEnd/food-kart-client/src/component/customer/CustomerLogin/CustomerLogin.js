import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {CustomerContext} from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

// loadingComponentName = {loadingComponentName}
// setLoadingComponentName = {setLoadingComponentName}

const CustomerLogin = ({
                           loadingComponentName,
                           setLoadingComponentName,
                       }) => {
    const {customerEmail, setCustomerEmail} =  useContext(CustomerContext);
    // const { email, setEmail } = useContext(CustomerContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleReset = () => {
        setUsername('');
        setPassword('');
        setErrorMessage('');
    };

    // http://localhost:9192/customer/get-customer-emailAndpassword?email=bhunesh2@&password=password
    const handleLogin = async () => {
        try {

            const response = await axios.get('http://localhost:9192/customer/get-customer-emailAndpassword', {
                params: {
                    email: username,
                    password: password,
                }
            });

            if (response.data) {
                setCustomerEmail(response.data.email);
                setLoadingComponentName("home");
                return;
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Invalid username or password');
        }
    };

    const handleForgotPassword = () => {
        setLoadingComponentName('forgotCustomerPassword');
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <div style={styles.formGroup}>
                <label>Username (Email):</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.formGroup}>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
            </div>

            {errorMessage && <div style={styles.error}>{errorMessage}</div>}

            <div style={styles.buttonGroup}>
                <button onClick={handleReset} style={styles.button}>
                    Reset
                </button>
                <button onClick={handleLogin} style={styles.button}>
                    Login
                </button>
                <button onClick={handleForgotPassword} style={styles.button}>
                    Forgot Password
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default CustomerLogin;
