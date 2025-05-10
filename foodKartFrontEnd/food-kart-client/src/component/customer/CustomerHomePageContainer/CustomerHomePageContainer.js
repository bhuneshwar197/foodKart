
import React, {useContext} from "react";
import './CustomerHomePageContainer.css'; // optional for custom styles


// const CustomerHomePage = () => {
//     return (
//         <section>
//             <h1> this is customer section</h1>
//             <MenuBar />
//         </section>
//     );
// };
//
// export default CustomerHomePage;

import { useState } from "react";
import CustomerHomeMenu from "../CustomerHomeMenu/CustomerHomeMenu";
import ContactUs from "../ContactUs/ContactUs";
import AboutUs from "../AboutUs/AboutUs";
import MyCart from "../MyCart/MyCart";
import ViewCustomerFeedback from "../ViewCustomerFeedback/ViewCustomerFeedback";
import SendFeedback from "../SendFeedback/SendFeedback";
// import ViewAdmin from "./ViewAdmin/ViewAdmin";
// import ViewCustomer from "./ViewCustomer/ViewCustomer";
// import ViewFeedback from "./ViewFeedback/ViewFeedback";
// import AddFood from "./AddFood/AddFood";
// import ViewCustomerFood from "./ViewCustomerFood/ViewCustomerFood";
import ViewCustomerFood from "../ViewCustomerFood/ViewCustomerFood";
import CustomerLogin from "../CustomerLogin/CustomerLogin";
import {CustomerContext, CustomerProvider} from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";
import CustomerHomePage from "./CustomerHomePage/CustomerHomePage";
import ViewCustomerOrders from "../ViewCustomerOrders/ViewCustomerOrders";
// import DeleteFoodByFoodId from "./DeleteFoodByFoodId/DeleteFoodByFoodId";
// import ViewFoodByFoodId from "./ViewFoodByFoodId/ViewFoodByFoodId";

const componentsName = {
    home: 'home',
    contactUs: 'contactUs',
    aboutUs: 'aboutUs',
    customerLogin: 'customerLogin',
    viewCustomerOrders: 'viewCustomerOrders',
};


const CustomerHomePageContainer = () => {
    // const [customerEmail, setCustomerEmail] =  useContext(CustomerContext);

    // const {customerEmail, setCustomerEmail} =  useContext(CustomerContext);


    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [loadingComponentName, setLoadingComponentName] = useState(null);

    const handleAddFoodClick = async () => {
        setLoadingComponentName(componentsName.addFood);
    };

    const handleViewAdminClick = async () => {
        setLoadingComponentName(componentsName.viewAdmin);
    };

    const styles = {
        nav: { display: "flex", justifyContent: "space-around", background: "#333", padding: "10px", color: "white" },
        menuItem: { position: "relative", padding: "10px", cursor: "pointer" },
        submenu: { position: "absolute", top: "40px", left: "0", background: "#444", padding: "10px", listStyle: "none", display: openSubMenu ? "block" : "none" },
        submenuItem: {
            padding: "8px",
            cursor: "pointer",
            color: "white",
            textDecoration: "none",
            width: "200px",
            display: "block"
        },
    };

    // console.log("customerEmail in customerHomepage ======" +customerEmail);
    return (
        <CustomerProvider>
            <CustomerHomePage />
        </CustomerProvider>

    );
};

export default CustomerHomePageContainer;

