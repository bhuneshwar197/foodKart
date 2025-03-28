import React, {useEffect, useState} from "react";
import TableComponent from "../common/TableComponent/TableComponent";


const ViewAdmin = () => {

    const [tableData, setTableData] = useState([]);

    const fetchViewAdminData = async () => {
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const response = await fetch("http://localhost:9192/admin/get-all-admins");
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = await response.json();
                return data; // Return data if successful

            }
            catch (error) {
                console.error(`Error fetching admin data (Attempt ${attempt + 1}):`, error);
                attempt++;
                if (attempt < maxRetries) {
                    console.log(`Retrying in 1 minute... (${maxRetries - attempt} retries left)`);
                } else {
                    console.error("Max retries reached. Returning empty data.");
                    return []; // Return empty array after max retries
                }
            }
        }
    };

    const setViewAdminData = async () => {
        const result = await fetchViewAdminData();
        setTableData(result);
    };

    useEffect(() => {
        setViewAdminData();
    }, []);

    return (
        <TableComponent
            tableData={tableData}
        />
    );
};

export default ViewAdmin;