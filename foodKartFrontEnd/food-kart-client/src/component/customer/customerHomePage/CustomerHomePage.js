
import React from "react";
import './CustomerHomePage.css'; // optional for custom styles


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
import Home from "../Home/Home";
import ContactUs from "../ContactUs/ContactUs";
import AboutUs from "../AboutUs/AboutUs";
// import ViewAdmin from "./ViewAdmin/ViewAdmin";
// import ViewCustomer from "./ViewCustomer/ViewCustomer";
// import ViewFeedback from "./ViewFeedback/ViewFeedback";
// import AddFood from "./AddFood/AddFood";
// import ViewFood from "./ViewFood/ViewFood";
// import DeleteFoodByFoodId from "./DeleteFoodByFoodId/DeleteFoodByFoodId";
// import ViewFoodByFoodId from "./ViewFoodByFoodId/ViewFoodByFoodId";

const componentsName = {
    home: 'home',
    contactUs: 'contactUs',
    aboutUs: 'aboutUs',
};

const CustomerHomePage = () => {
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

    return (
        <div>
            {/* Navbar */}
            <nav style={styles.nav}>
                <div className="logo">foodKART</div>

                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("Home")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                    onClick={() => setLoadingComponentName(componentsName.home)}
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
                                    onClick={() => setLoadingComponentName(componentsName.viewFood)}
                                >
                                    View Food
                                </span>
                            </li>

                            <li>
                                <span style={styles.submenuItem}
                                      onClick={() => handleAddFoodClick()}
                                >
                                    Add Food
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.viewFoodByFoodId)}
                                >
                                    View Food by Food Id
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.deleteFoodByFoodId)}
                                >
                                    Delete Food by Food Id
                                </span>
                            </li>


                        </ul>
                    )}
                </div>

                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("AboutUs")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                    onClick={() => setLoadingComponentName(componentsName.aboutUs)}
                >
                    <span>About Us</span>
                </div>

                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("ContactUs")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                    onClick={() => setLoadingComponentName(componentsName.contactUs)}
                >
                    <span>Contact Us</span>
                </div>



                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("YourAccount")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <span>Your Account ▼</span>
                    {openSubMenu === "YourAccount" && (
                        <ul style={styles.submenu}>
                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.viewFeedback)}
                                >
                                    My Cart
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.viewFeedback)}
                                >
                                    My Order
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.viewFeedback)}
                                >
                                    View Feedback
                                </span>
                            </li>

                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.viewFeedback)}
                                >
                                    Send Feedback
                                </span>
                            </li>

                        </ul>
                    )}
                </div>

            </nav>

            {(() => {
                if (loadingComponentName === componentsName.home) {
                    return <Home />;
                } else if (loadingComponentName === componentsName.contactUs) {
                    return <ContactUs />
                } else if (loadingComponentName === componentsName.aboutUs) {
                    return <AboutUs />
                }

            })()}

        </div>
    );
};

export default CustomerHomePage;

