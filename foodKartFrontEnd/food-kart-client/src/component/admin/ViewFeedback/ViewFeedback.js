import React, { useEffect, useState } from "react";
import TableComponent from "../common/TableComponent/TableComponent";
import FullScreenSpinner from "../common/FullScreenSpinner/FullScreenSpinner";

const ViewFeedback = () => {
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchViewFeedbackData = async () => {
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:9192/feedback/get-all-feedback");
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = await response.json();

                if (data.length === 0) {
                    setError("No feedback available.");
                }

                return data;
            } catch (error) {
                console.error(`Error fetching feedback data (Attempt ${attempt + 1}):`, error);
                attempt++;

                if (attempt < maxRetries) {
                    console.log(`Retrying in 1 minute... (${maxRetries - attempt} retries left)`);
                } else {
                    console.error("Max retries reached. Returning empty data.");
                    setError("Failed to load feedback data.");
                    return [];
                }
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        setTableData([]);
        setError(null);
        fetchViewFeedbackData().then(setTableData);
    }, []);

    return (
        <div>
            {loading && <FullScreenSpinner />}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && tableData.length === 0 && <h1>No feedback available.</h1>}
            {tableData.length > 0 && (
                <TableComponent
                    tableData={tableData}
                    tableHeading="Feedback Data"
                />
            )}
        </div>
    );
};

export default ViewFeedback;
