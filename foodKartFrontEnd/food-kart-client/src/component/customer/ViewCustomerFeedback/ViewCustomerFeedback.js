import React, {useEffect, useState} from 'react';
import TableComponent from "../../admin/common/TableComponent/TableComponent";

const ViewCustomerFeedback = () => {
    const [tableData, setTableData] = useState([]);

    const fetchMyCartDataFromBackend = async () => {
        const customerEmail = "customer@example.com";
        try {
            const response = await fetch("http://localhost:9192/cart1/get-cart-by-email/" + customerEmail);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching Cart data `, error);
        }
    };

    useEffect(() => {
        setTableData([]);
        fetchMyCartDataFromBackend().then(setTableData);
    }, []);

    return (
        <div>
            {tableData?.length > 0 && (
                <TableComponent
                    tableData={tableData}
                    tableHeading="View Customer Feedback"
                />
            )}
        </div>
    );
};

export default ViewCustomerFeedback;
