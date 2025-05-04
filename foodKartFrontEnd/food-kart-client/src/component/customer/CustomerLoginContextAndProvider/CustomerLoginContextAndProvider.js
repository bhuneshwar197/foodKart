
import React, { createContext, useState } from 'react';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customerEmail, setCustomerEmail] = useState('');

    // value={{ customerEmail, setCustomerEmail }}

    return (
        <CustomerContext.Provider value={{ customerEmail, setCustomerEmail }}>
            {children}
        </CustomerContext.Provider>
    );
};
