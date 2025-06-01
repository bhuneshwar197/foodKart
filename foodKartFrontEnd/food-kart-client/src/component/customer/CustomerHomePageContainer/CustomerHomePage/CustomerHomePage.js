
import React, {useContext} from "react";
import './CustomerHomePage.css'; // optional for custom styles

import { useState } from "react";
import CustomerHomeMenu from "../../CustomerHomeMenu/CustomerHomeMenu";
import ContactUs from "../../ContactUs/ContactUs";
import AboutUs from "../../AboutUs/AboutUs";
import MyCart from "../../MyCart/MyCart";
import ViewCustomerFeedback from "../../ViewCustomerFeedback/ViewCustomerFeedback";
import SendFeedback from "../../SendFeedback/SendFeedback";
import ViewCustomerFood from "../../ViewCustomerFood/ViewCustomerFood";
import CustomerLogin from "../../CustomerLogin/CustomerLogin";
import {CustomerContext, CustomerProvider} from "../../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";
import ViewCustomerOrders from "../../ViewCustomerOrders/ViewCustomerOrders";
import CustomerNotLoginOrSignedUp from "../../CustomerNotLoginOrSignedUp/CustomerNotLoginOrSignedUp";
import CustomerSignup from "../../CustomerSignup/CustomerSignup";
import ResetCustomerPassword from "../../ResetCustomerPassword/ResetCustomerPassword";
import ForgotCustomerPassword from "../../ForgotCustomerPassword/ForgotCustomerPassword";
// import DeleteFoodByFoodId from "./DeleteFoodByFoodId/DeleteFoodByFoodId";
// import ViewFoodByFoodId from "./ViewFoodByFoodId/ViewFoodByFoodId";

const componentsName = {
    home: 'home',
    contactUs: 'contactUs',
    aboutUs: 'aboutUs',
    customerLogin: 'customerLogin',
    customerSignup: 'customerSignup',
    viewCustomerOrders: 'viewCustomerOrders',
    viewCustomerFood: 'viewCustomerFood',
    viewCustomerFeedback: 'viewCustomerFeedback',
    sendFeedback: 'sendFeedback',
    myCart: 'myCart',
    customerNotLoginOrSignedUp: 'customerNotLoginOrSignedUp',
    forgotCustomerPassword: 'forgotCustomerPassword',
};


const CustomerHomePage = () => {

    const {customerEmail, setCustomerEmail} =  useContext(CustomerContext);
    const {customerName} =  useContext(CustomerContext);


    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [loadingComponentName, setLoadingComponentName] = useState('home');

    const styles = {
        nav: { display: "flex", justifyContent: "space-around", background: "#333", padding: "10px", color: "white" },
        menuItem: { position: "relative", padding: "10px", cursor: "pointer" },
        submenu: {
            position: "absolute",
            top: "40px",
            left: "0",
            background: "#555",
            padding: "10px",
            listStyle: "none",
            zIndex: 9999,
            display: openSubMenu ? "block" : "none"
        },
        submenuItem: {
            padding: "8px",
            cursor: "pointer",
            color: "white",
            textDecoration: "none",
            width: "200px",
            display: "block"
        },
        customerName: {
            padding: "10px",
            color: "red",
        },
    };

    const handleCustomerLogout = () => {
        setCustomerEmail("");
        setLoadingComponentName(componentsName.home);
        setOpenSubMenu(null);
    };

    const handleHomeMenuClick = () => {
        setLoadingComponentName(componentsName.home);
        setOpenSubMenu(null);
    };

    const handleViewCustomerFoodClick = () => {
        setLoadingComponentName(componentsName.viewCustomerFood);
        setOpenSubMenu(null);
    };

    const handleAboutUsClick = () => {
        setLoadingComponentName(componentsName.aboutUs);
        setOpenSubMenu(null);
    }

    const handleCustomerLogin = () => {
        setLoadingComponentName(componentsName.customerLogin);
        setOpenSubMenu(null);
    }

    const handleCustomerSignup = () => {
        setLoadingComponentName(componentsName.customerSignup);
        setOpenSubMenu(null);
    }

    const handleSendFeedback = () => {
        const loadComponent = customerEmail ? componentsName.sendFeedback : componentsName.customerNotLoginOrSignedUp;
        setLoadingComponentName(loadComponent);
        setOpenSubMenu(null);
    }


    const handleViewFeedback = () => {
        const loadComponent = customerEmail ? componentsName.viewCustomerFeedback : componentsName.customerNotLoginOrSignedUp;
        setLoadingComponentName(loadComponent); //loadingComponentName
        setOpenSubMenu(null);
    }

    const handleMyOrderClick = () => {
        setLoadingComponentName('');
        const loadComponent = customerEmail ? componentsName.viewCustomerOrders : componentsName.customerNotLoginOrSignedUp;
        setLoadingComponentName(loadComponent);
        setOpenSubMenu(null);
    }

    const handleMyCartClick = () => {
        const loadComponent = customerEmail ? componentsName.myCart : componentsName.customerNotLoginOrSignedUp;
        setLoadingComponentName(loadComponent);
        setOpenSubMenu(null);
    }

    const handleContactUsClick = () => {
        setLoadingComponentName(componentsName.contactUs);
        setOpenSubMenu(null);
    }


    const renderComponent = () => {
        if (loadingComponentName === componentsName.home) {
            return <CustomerHomeMenu />;
        } else if (loadingComponentName === componentsName.contactUs) {
            return <ContactUs />
        } else if (loadingComponentName === componentsName.aboutUs) {
            return <AboutUs />
        } else if (loadingComponentName === componentsName.customerSignup) {
            return <CustomerSignup
                setLoadingComponentName = {setLoadingComponentName}
            />
        } else if (loadingComponentName === componentsName.customerLogin) {
            return <CustomerLogin
                loadingComponentName = {loadingComponentName}
                setLoadingComponentName = {setLoadingComponentName}
            />
        } else if (loadingComponentName === componentsName.myCart) {
            return <MyCart />
        }
        else if (loadingComponentName === componentsName.viewCustomerFeedback) {
            return <ViewCustomerFeedback/>
        }
        else if (loadingComponentName === componentsName.sendFeedback) {
            return <SendFeedback/>
        }
        else if (loadingComponentName === componentsName.viewCustomerFood) {
            return <ViewCustomerFood
                setLoadingComponentName = {setLoadingComponentName}
            />
        } else if (loadingComponentName === componentsName.viewCustomerOrders) {
            return <ViewCustomerOrders/>
        } else if (loadingComponentName === componentsName.customerNotLoginOrSignedUp) {
            return <CustomerNotLoginOrSignedUp />
        } else if (loadingComponentName === componentsName.forgotCustomerPassword) {
            return <ForgotCustomerPassword />
        }
    };

    return (

        <div>
            {/* Navbar */}
            <nav style={styles.nav}>
                <div className="logo-contaoner">
                    <div className="logo">foodKART</div>
                </div>

                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("Home")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                    onClick={handleHomeMenuClick}
                >
                    <span>Home</span>
                </div>


                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("food")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <span>Food ▼</span>
                    {openSubMenu === "food" && (
                        <ul style={styles.submenu}>
                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={handleViewCustomerFoodClick}
                                >
                                    View Food
                                </span>
                            </li>

                        </ul>
                    )}
                </div>

                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("AboutUs")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                    onClick={handleAboutUsClick}
                >
                    <span>About Us</span>
                </div>

                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("ContactUs")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                    onClick={handleContactUsClick}
                >
                    <span>Contact Us</span>
                </div>

                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("myAccount")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <span>My Account ▼</span>
                    {openSubMenu === "myAccount" && (
                        <ul style={styles.submenu}>

                            {!customerEmail  && (
                                <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={handleCustomerLogin}
                                >
                                    Login
                                </span>
                                </li>
                            )}

                            {!customerEmail  && (
                                <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={handleCustomerSignup}
                                >
                                    Sign Up
                                </span>
                                </li>
                            )}

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={handleMyCartClick}
                                >
                                    My Cart
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={handleMyOrderClick}
                                >
                                    My Order
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={handleViewFeedback}
                                >
                                    View Feedback
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={handleSendFeedback}
                                >
                                    Send Feedback
                                </span>
                            </li>

                            {customerEmail  && (
                                <li>
                                    <span
                                        style={styles.submenuItem}
                                        onClick={handleCustomerLogout}
                                    >
                                        Logout
                                    </span>
                                </li>
                            )}

                        </ul>
                    )}
                </div>

                {customerEmail &&
                    <div style={styles.customerName}>Hello {customerName} !</div>
                }

            </nav>

            {renderComponent()}

        </div>
    );
};

export default CustomerHomePage;

