import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Home from "./Home";
import StudentsView from "./component/student/StudentsView";
import NavBar from "./component/common/NavBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import AddStudent from "./component/student/AddStudent";
import EditStudent from "./component/student/EditStudent";
import StudentPofile from "./component/student/StudentPofile";
import AdminHomePage from "./component/admin/AdminHomePage";
import CustomerHomePage from "./component/customer/customerHomePage/CustomerHomePage";

function App() {
	return (
		<main className="container mt-5">
			<Router>
				{/*<NavBar />*/}
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}
					></Route>
					<Route
						exact
						path="/view-students"
						element={<StudentsView />}></Route>
						{/*element={<AdminHomePage />}></Route>*/}
					<Route
						exact
						path="/add-students"
						element={<AddStudent />}></Route>
					<Route
						exact
						path="/edit-student/:id"
						element={<EditStudent />}></Route>

					{/*<Route*/}
					{/*	exact*/}
					{/*	path="/foodkart"*/}
					{/*	element={<CustomerHomePage />}>*/}
					{/*</Route>*/}

					{/*<Route*/}
					{/*	exact*/}
					{/*	path="/foodkart"*/}
					{/*	element={<CustomerHomePage />}*/}
					{/*/>*/}

					<Route
						exact
						path="/foodkart"
						element={<CustomerHomePage />}
						// element={<AdminHomePage />}
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
