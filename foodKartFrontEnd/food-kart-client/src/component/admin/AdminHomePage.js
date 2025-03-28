import { useState } from "react";
import TableComponent from "./common/TableComponent/TableComponent";
import ViewAdmin from "./ViewAdmin/ViewAdmin";

// Mock API function to fetch data
const fetchData = async (type) => {
    const mockData = {
        viewAdmin: [{ id: 1, name: "Admin 1", role: "Manager" }, { id: 2, name: "Admin 2", role: "Supervisor" }],
        updateAdmin: [{ id: 1, name: "Admin 1 Updated", role: "Director" }, { id: 2, name: "Admin 2 Updated", role: "Lead" }],
        viewFood: [{ id: 1, name: "Pizza", category: "Fast Food" }, { id: 2, name: "Pasta", category: "Italian" }],
        updateFood: [{ id: 1, name: "Pizza Updated", category: "Fast Food" }, { id: 2, name: "Pasta Updated", category: "Italian" }],
    };

    return new Promise((resolve) => setTimeout(() => resolve(mockData[type] || []), 1000));
};



const AdminHomePage = () => {
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [data, setData] = useState([]);
    const [loadingComponentName, setLoadingComponentName] = useState(null);

    const handleMenuClick = async (type) => {
        const result = await fetchData(type);
        setData(result);
    };

    const handleViewAdminClick = async () => {
        setLoadingComponentName('ViewAdmin');
    };

    const styles = {
        nav: { display: "flex", justifyContent: "space-around", background: "#333", padding: "10px", color: "white" },
        menuItem: { position: "relative", padding: "10px", cursor: "pointer" },
        submenu: { position: "absolute", top: "40px", left: "0", background: "#444", padding: "10px", listStyle: "none", display: openSubMenu ? "block" : "none" },
        submenuItem: { padding: "8px", cursor: "pointer", color: "white", textDecoration: "none", display: "block" },
    };

    return (
        <div>
            {/* Navbar */}
            <nav style={styles.nav}>
                <div
                    style={styles.menuItem}
                    onMouseEnter={() => setOpenSubMenu("admin")}
                    onMouseLeave={() => setOpenSubMenu(null)}
                >
                    <span>Admin ▼</span>
                    {openSubMenu === "admin" && (
                        <ul style={styles.submenu}>
                            <li><span style={styles.submenuItem} onClick={() => handleViewAdminClick()}>View Admin</span></li>
                            <li><span style={styles.submenuItem} onClick={() => handleMenuClick("updateAdmin")}>Update Admin</span></li>
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
                            <li><span style={styles.submenuItem} onClick={() => handleMenuClick("viewFood")}>View Food</span></li>
                            <li><span style={styles.submenuItem} onClick={() => handleMenuClick("updateFood")}>Update Food</span></li>
                        </ul>
                    )}
                </div>
            </nav>

            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Data Table</h1>
            {(() => {
                if (loadingComponentName === 'ViewAdmin') {
                    return <ViewAdmin />;
                } else {
                    return <p style={{ textAlign: "center", fontSize: "18px" }}>Click a submenu to load data.</p>;
                }
            })()}


        </div>
    );
};

export default AdminHomePage;

