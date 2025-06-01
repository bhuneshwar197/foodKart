
import React, { createContext, useState } from 'react';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerName, setCustomerName] = useState('');

    // value={{ customerEmail, setCustomerEmail }}

    return (
        <CustomerContext.Provider value={{ customerEmail, setCustomerEmail, customerName, setCustomerName }}>
            {children}
        </CustomerContext.Provider>
    );
};
