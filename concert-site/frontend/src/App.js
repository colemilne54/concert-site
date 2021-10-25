// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddConcert from "./components/add-concert";
import Concert from "./components/concert";
import ConcertsList from "./components/concerts-list";
import Login from "./components/login";


function App() {
	const [user, setUser] = React.useState(null);

	async function login(user = null) {
		setUser(user);
	}

	async function logout() {
		setUser(null);
	}

	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/concerts" className="navbar-brand">
					Concert Site
				</a>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/concerts"} className="nav-link">
							Concerts
						</Link>
					</li>
					<li className="nav-item" >
						{user ? (
							<a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
								Logout {user.name}
							</a>
						) : (
							<Link to={"/login"} className="nav-link">
								Login
							</Link>
						)}

					</li>
				</div>
			</nav>


			<div className="container mt-3">
				<Switch>
					<Route exact path={["/"]} component={ConcertsList} />
					<Route
						path="/concerts"
						render={(props) => (
							<AddConcert {...props} user={user} />
						)}
					/>
					<Route
						path="/concerts/:id"
						render={(props) => (
							<Concert {...props} user={user} />
						)}
					/>
					<Route
						path="/login"
						render={(props) => (
							<Login {...props} login={login} />
						)}
					/>
				</Switch>
			</div>


		</div>
	);
}

export default App;
