import React from "react";
import { Link } from "react-router-dom";
const styles = {
    foodKartAdminSectionContainer: {
        color: 'red',
        textAlign: 'center',
        background: 'black',
        height: '70px',
        width: '100%'
    },
    foodKartAdminSectionText: {
        fontSize: '40px',
    }
};
const AdminHeader = () => {

    return (
        <div>
            <div style={styles.foodKartAdminSectionContainer}>
                <div style={styles.foodKartAdminSectionText}>
                    foodKart Admin Section
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
