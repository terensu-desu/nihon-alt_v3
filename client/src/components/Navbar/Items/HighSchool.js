import React from "react";
import { NavLink } from "react-router-dom";
import Aux from "../../../hoc/Aux";

const highSchool = props => (
	<Aux>
		<li className="nav-item dropdown">
			<a
				className="nav-link dropdown-toggle"
				href="#!"
				id="navbarDropdown"
				role="button"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				High School
			</a>
			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
				<NavLink className="dropdown-item" to="/pages/highschool/activities/part1">
					Activities
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/highschool/games/part1">
					Games
				</NavLink>
			</div>
		</li>
	</Aux>
);

export default highSchool;
