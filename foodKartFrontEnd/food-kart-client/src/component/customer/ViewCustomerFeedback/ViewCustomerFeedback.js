import React, { useEffect, useState } from 'react';
import TableComponent from "../../admin/common/TableComponent/TableComponent";

const ViewCustomerFeedback = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyCartDataFromBackend = async () => {
        const customerEmail = "customer@example.com";
        try {
            const response = await fetch("http://localhost:9192/cart1/get-cart-by-email/" + customerEmail);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Cart data", error);
            return [];
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchMyCartDataFromBackend()
            .then(data => {
                setTableData(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : tableData?.length > 0 ? (
                <TableComponent
                    tableData={tableData}
                    tableHeading="View Customer Feedback"
                />
            ) : (
                <h1>No feedback available.</h1>
            )}
        </div>
    );
};

export default ViewCustomerFeedback;
