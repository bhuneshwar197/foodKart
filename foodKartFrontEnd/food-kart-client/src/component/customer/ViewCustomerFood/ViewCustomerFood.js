
import React, {useEffect, useState} from 'react';
import TableComponent from "../../admin/common/TableComponent/TableComponent";
import FoodTable from "./FoodTable/FoodTable";

const ViewCustomerFood = ({
                              setLoadingComponentName,
                          }) => {
    const [tableData, setTableData] = useState([]);

    const fetchMyCartDataFromBackend = async () => {
        try {
            const response = await fetch("http://localhost:9192/food/get-all-food" );
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
            {tableData.length > 0 && (
                <FoodTable
                    foods={tableData}
                    setLoadingComponentName={setLoadingComponentName}
                />
            )}

        </div>
    );
};

export default ViewCustomerFood;

