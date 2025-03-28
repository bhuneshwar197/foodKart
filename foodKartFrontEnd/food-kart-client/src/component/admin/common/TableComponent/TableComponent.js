import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import FullScreenSpinner from "../FullScreenSpinner/FullScreenSpinner";

const styles = {
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
    th: { border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" },
    td: { border: "1px solid #ddd", padding: "8px" }
};

const TableComponent = ({ tableData, tableHeading }) => {
    if (!tableData || tableData.length === 0) {
        return (<FullScreenSpinner />);
    }

    return (
        <>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>{tableHeading}</h1>

        <table style={styles.table}>
            <thead>
            <tr>
                {Object.keys(tableData[0]).map((key) => (
                    <th key={key} style={styles.th}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {tableData.map((item, index) => (
                <tr key={index}>
                    {Object.values(item).map((val, i) => (
                        <td key={i} style={styles.td}>{val}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
            </>
    );
};

export default TableComponent;
