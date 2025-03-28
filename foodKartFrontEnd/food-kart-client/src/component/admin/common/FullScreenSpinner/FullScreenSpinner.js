import Spinner from 'react-bootstrap/Spinner';

const FullScreenSpinner = () => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999 // Ensures it stays on top
        }}>
            <Spinner animation="border" role="status" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default FullScreenSpinner;
