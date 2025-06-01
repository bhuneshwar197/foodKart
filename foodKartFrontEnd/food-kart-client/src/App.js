import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
// import Home from "./Home";
// import NavBar from "./component/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import AdminHomePage from "./component/admin/AdminHomePage";
import CustomerHomePageContainer from "./component/customer/CustomerHomePageContainer/CustomerHomePageContainer";

function App() {
	return (
		<main className="container mt-5">
			<Router>
				{/*<NavBar />*/}
				<Routes>

					<Route
						exact
						path="/foodkart.com"
						element={<CustomerHomePageContainer />}
					/>

					<Route
						exact
						path="/adminHomePage"
						element={<AdminHomePage />}
					/>

				</Routes>
			</Router>
		</main>
	);
}

export default App;
