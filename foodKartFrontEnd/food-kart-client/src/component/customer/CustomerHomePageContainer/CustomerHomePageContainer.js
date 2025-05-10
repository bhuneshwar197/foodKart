
import React, {useContext} from "react";
import './CustomerHomePageContainer.css'; // optional for custom styles


import {CustomerContext, CustomerProvider} from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";
import CustomerHomePage from "./CustomerHomePage/CustomerHomePage";



const CustomerHomePageContainer = () => {



    return (
        <CustomerProvider>
            <CustomerHomePage />
        </CustomerProvider>

    );
};

export default CustomerHomePageContainer;

