
import React, {useEffect, useState} from 'react';
import TableComponent from "../../admin/common/TableComponent/TableComponent";
import FoodTable from "./FoodTable/FoodTable";

const ViewCustomerFood = ({
                              setLoadingComponentName,
                          }) => {
    const [customerFood, setCustomerFood] = useState([]);
    const [customerFoodError, setCustomerFoodError] = useState(true);

    const fetchFoodData = async () => {
        try {
            const response = await fetch("http://localhost:9192/food/get-all-food" );
            const data = await response.json();
            return data;
        } catch (error) {
            setCustomerFood([]);
            setCustomerFoodError(true);
            console.error(`Error fetching Cart data `, error);
        }
    };

    useEffect(() => {
        setCustomerFood([]);
        fetchFoodData().then(setCustomerFood);
    }, []);

    return (
    <>
        {customerFoodError && ( <h1>No Food available.</h1> ) }
        <div>
            {customerFood?.length > 0 && (
                <FoodTable
                    foods={customerFood}
                    setLoadingComponentName={setLoadingComponentName}
                />
            )}

        </div>
    </>
    );
};

export default ViewCustomerFood;

