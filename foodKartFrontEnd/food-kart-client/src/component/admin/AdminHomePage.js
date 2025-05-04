import { useState } from "react";
import ViewAdmin from "./ViewAdmin/ViewAdmin";
import ViewCustomer from "./ViewCustomer/ViewCustomer";
import ViewFeedback from "./ViewFeedback/ViewFeedback";
import AddFood from "./AddFood/AddFood";
import ViewCustomerFood from "../customer/ViewCustomerFood/ViewCustomerFood";
import DeleteFoodByFoodId from "./DeleteFoodByFoodId/DeleteFoodByFoodId";
import ViewFoodByFoodId from "./ViewFoodByFoodId/ViewFoodByFoodId";

const componentsName = {
    viewCustomer: 'ViewCustomer',
    viewAdmin: 'ViewAdmin',
    viewFeedback: 'ViewFeedback',
    viewFood: 'ViewFood',
    addFood: 'AddFood',
    viewFoodByFoodId: 'ViewFoodByFoodId',
    deleteFoodByFoodId: 'DeleteFoodByFoodId',
};

const AdminHomePage = () => {
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


                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("Customer")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <span>Customer ▼</span>
                    {openSubMenu === "Customer" && (
                        <ul style={styles.submenu}>
                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.viewCustomer)}
                                >
                                    View Customer
                                </span>
                            </li>
                        </ul>
                    )}
                </div>


                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("admin")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <span>Admin ▼</span>
                    {openSubMenu === "admin" && (
                        <ul style={styles.submenu}>
                            <li>
                                <span style={styles.submenuItem}
                                      onClick={() => handleViewAdminClick()}
                                >
                                View Admin</span>
                            </li>
                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => handleViewAdminClick()}
                                >
                                    Update Admin
                                </span>
                            </li>
                        </ul>
                    )}
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
                                      // onClick={() => handleAddFoodClick()}
                                      // onClick={() => setLoadingComponentName(componentsName.viewFood)}
                                      onClick={() => setLoadingComponentName("AddFood")}

                                      // setLoadingComponentName(componentsName.addFood);
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
                    onMouseEnter={() => setOpenSubMenu("Feedback")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <span>Feedback ▼</span>
                    {openSubMenu === "Feedback" && (
                        <ul style={styles.submenu}>
                            <li>
                                <span
                                    style={styles.submenuItem}
                                    onClick={() => setLoadingComponentName(componentsName.viewFeedback)}
                                >
                                    View Feedback
                                </span>
                            </li>
                        </ul>
                    )}
                </div>

            </nav>

            {(() => {
                if (loadingComponentName === componentsName.viewAdmin) {
                    return <ViewAdmin />;
                } else if (loadingComponentName === componentsName.viewCustomer) {
                    return <ViewCustomer/>;
                } else if (loadingComponentName === componentsName.viewFeedback) {
                    return <ViewFeedback />;
                } else if (loadingComponentName === componentsName.viewFood) {
                    return <ViewCustomerFood />;
                } else if (loadingComponentName === componentsName.addFood) {
                    return <AddFood />;
                } else if (loadingComponentName === componentsName.viewFoodByFoodId) {
                    return <ViewFoodByFoodId />;
                } else if (loadingComponentName === componentsName.deleteFoodByFoodId) {
                    return <DeleteFoodByFoodId />;
                } else {
                    return <p style={{ textAlign: "center", fontSize: "18px" }}>Click a submenu to load data.</p>;
                }
            })()}


        </div>
    );
};

export default AdminHomePage;

