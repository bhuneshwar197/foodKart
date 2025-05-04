
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
// import DeleteFoodByFoodId from "./DeleteFoodByFoodId/DeleteFoodByFoodId";
// import ViewFoodByFoodId from "./ViewFoodByFoodId/ViewFoodByFoodId";

const componentsName = {
    home: 'home',
    contactUs: 'contactUs',
    aboutUs: 'aboutUs',
    customerLogin: 'customerLogin',
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
            {/*<div>*/}
            {/*    /!* Navbar *!/*/}
            {/*    <nav style={styles.nav}>*/}
            {/*        <div className="logo">foodKART</div>*/}

            {/*        <div*/}
            {/*            style={styles.menuItem}*/}
            {/*            onMouseEnter={() => setOpenSubMenu("Home")}*/}
            {/*            onMouseLeave={() => setOpenSubMenu(null)}*/}
            {/*            onClick={() => setLoadingComponentName(componentsName.home)}*/}
            {/*        >*/}
            {/*            <span>Home</span>*/}

            {/*        </div>*/}


            {/*        <div*/}
            {/*            style={styles.menuItem}*/}
            {/*            onMouseEnter={() => setOpenSubMenu("food")}*/}
            {/*            onMouseLeave={() => setOpenSubMenu(null)}*/}
            {/*        >*/}
            {/*            <span>Food ▼</span>*/}
            {/*            {openSubMenu === "food" && (*/}
            {/*                <ul style={styles.submenu}>*/}
            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName("ViewCustomerFood")}*/}
            {/*                    >*/}
            {/*                        View Food*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                    <li>*/}
            {/*                    <span style={styles.submenuItem}*/}
            {/*                          onClick={() => handleAddFoodClick()}*/}
            {/*                    >*/}
            {/*                        Add Food*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName(componentsName.viewFoodByFoodId)}*/}
            {/*                    >*/}
            {/*                        View Food by Food Id*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName(componentsName.deleteFoodByFoodId)}*/}
            {/*                    >*/}
            {/*                        Delete Food by Food Id*/}
            {/*                    </span>*/}
            {/*                    </li>*/}


            {/*                </ul>*/}
            {/*            )}*/}
            {/*        </div>*/}

            {/*        <div*/}
            {/*            style={styles.menuItem}*/}
            {/*            onMouseEnter={() => setOpenSubMenu("AboutUs")}*/}
            {/*            onMouseLeave={() => setOpenSubMenu(null)}*/}
            {/*            onClick={() => setLoadingComponentName(componentsName.aboutUs)}*/}
            {/*        >*/}
            {/*            <span>About Us</span>*/}
            {/*        </div>*/}

            {/*        <div*/}
            {/*            style={styles.menuItem}*/}
            {/*            onMouseEnter={() => setOpenSubMenu("ContactUs")}*/}
            {/*            onMouseLeave={() => setOpenSubMenu(null)}*/}
            {/*            onClick={() => setLoadingComponentName(componentsName.contactUs)}*/}
            {/*        >*/}
            {/*            <span>Contact Us</span>*/}
            {/*        </div>*/}



            {/*        <div*/}
            {/*            style={styles.menuItem}*/}
            {/*            onMouseEnter={() => setOpenSubMenu("YourAccount")}*/}
            {/*            onMouseLeave={() => setOpenSubMenu(null)}*/}
            {/*        >*/}
            {/*            <span>Your Account ▼</span>*/}
            {/*            {openSubMenu === "YourAccount" && (*/}
            {/*                <ul style={styles.submenu}>*/}

            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName(componentsName.customerLogin)}*/}
            {/*                    >*/}
            {/*                        Login*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName("myCart")}*/}
            {/*                    >*/}
            {/*                        My Cart*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName(componentsName.viewFeedback)}*/}
            {/*                    >*/}
            {/*                        My Order*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName("viewCustomerFeedback")}*/}
            {/*                    >*/}
            {/*                        View Feedback*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                    <li>*/}
            {/*                    <span*/}
            {/*                        style={styles.submenuItem}*/}
            {/*                        onClick={() => setLoadingComponentName("sendFeedback")}*/}
            {/*                    >*/}
            {/*                        Send Feedback*/}
            {/*                    </span>*/}
            {/*                    </li>*/}

            {/*                </ul>*/}
            {/*            )}*/}
            {/*        </div>*/}

            {/*    </nav>*/}

            {/*    {(() => {*/}
            {/*        if (loadingComponentName === componentsName.home) {*/}
            {/*            return <CustomerHomeMenu />;*/}
            {/*        } else if (loadingComponentName === componentsName.contactUs) {*/}
            {/*            return <ContactUs />*/}
            {/*        } else if (loadingComponentName === componentsName.aboutUs) {*/}
            {/*            return <AboutUs />*/}
            {/*        } else if (loadingComponentName === componentsName.customerLogin) {*/}
            {/*            return <CustomerLogin*/}
            {/*                loadingComponentName = {loadingComponentName}*/}
            {/*                setLoadingComponentName = {setLoadingComponentName}*/}
            {/*            />*/}
            {/*        } else if (loadingComponentName === "myCart") {*/}
            {/*            return <MyCart />*/}
            {/*        }*/}
            {/*        else if (loadingComponentName === "viewCustomerFeedback") {*/}
            {/*            return <ViewCustomerFeedback/>*/}
            {/*        }*/}
            {/*        else if (loadingComponentName === "sendFeedback") {*/}
            {/*            return <SendFeedback/>*/}
            {/*        }*/}
            {/*        else if (loadingComponentName === "ViewCustomerFood") {*/}
            {/*            return <ViewCustomerFood/>*/}
            {/*        }*/}


            {/*    })()}*/}

            {/*</div>*/}
        </CustomerProvider>

    );
};

export default CustomerHomePageContainer;

