import React, {useContext, useEffect, useState} from 'react';
import TableComponent from "../../admin/common/TableComponent/TableComponent";
import {CustomerContext} from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

const ViewCustomerFeedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {customerEmail, setCustomerEmail} =  useContext(CustomerContext);


    const fetchCustomerFeedbackDataFromBackend = async () => {

        try {
            const response = await fetch("http://localhost:9192/feedback/get-feedback-by-email/" + customerEmail);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Cart data", error);
            return [];
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCustomerFeedbackDataFromBackend()
            .then(data => {
                setFeedbackData(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {/*{loading ? (*/}
            {/*    <p>Loading...</p>*/}
            {/*) : tableData?.length > 0 ? (*/}
            {/*    <TableComponent*/}
            {/*        tableData={tableData}*/}
            {/*        tableHeading="View Customer Feedback"*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <h1>No feedback available.</h1>*/}
            {/*)}*/}

            { feedbackData?.length > 0 ?
                (
                    <TableComponent
                        tableData={feedbackData}
                        tableHeading="View Customer Feedback"
                    />
                ) :
                (
                    <h1>No feedback available.</h1>
                )
            }

        </div>
    );
};

export default ViewCustomerFeedback;
