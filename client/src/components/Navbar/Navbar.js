import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Aux from "../../hoc/Aux";
import SearchBar from "../../containers/SearchBar/SearchBar";
import JhsYear1 from "./Items/JhsYear1";
import JhsYear2 from "./Items/JhsYear2";
import JhsYear3 from "./Items/JhsYear3";
import SpecialNeeds from "./Items/SpecialNeeds";
import HighSchool from "./Items/HighSchool";

class Navbar extends Component {
	handleLogoutClick = event => {
		event.preventDefault();
		this.props.logout();
	};
	render() {
		let authLinks = (
			<Aux>
				<li className="nav-item mr-2">
					<NavLink className="nav-link" to="/register">
						Sign Up
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/login">
						Log In
					</NavLink>
				</li>
			</Aux>
		);
		if (this.props.auth.isAuthenticated) {
			authLinks = (
				<Aux>
					<li className="nav-item mr-2">
						<NavLink className="nav-link" to="/upload">
							Upload
						</NavLink>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#!" onClick={this.handleLogoutClick}>
							<img
								className="rounded-circle"
								style={{ width: "25px", marginRight: "5px" }}
								src={this.props.auth.user.avatar}
								alt="Avatar"
								title="You must have a gravatar connected to your email to display your image here."
							/>
							Logout
						</a>
					</li>
				</Aux>
			);
		}
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-secondary">
				<div className="container-fluid">
					<NavLink className="navbar-brand mb-0" to="/">
						Nihon ALT
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav ml-auto">
							<JhsYear1 />
							<JhsYear2 />
							<JhsYear3 />
							<SpecialNeeds />
							<HighSchool />
						</ul>
						<ul className="navbar-nav ml-auto">
						  <SearchBar />
							{authLinks}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;