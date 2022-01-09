import React from "react";
import { NavLink } from "react-router-dom";
import Aux from "../../../hoc/AuxWrapper";

const specialNeeds = props => (
	<Aux>
		<li className="nav-item dropdown mr-2">
			<a
				className="nav-link dropdown-toggle"
				href="#!"
				id="snDropdown"
				role="button"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				Special Needs
			</a>
			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
				<NavLink className="dropdown-item" to="/pages/specialneeds/activities/part1">
					Activities
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/specialneeds/games/part1">
					Games
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/specialneeds/songs/part1">
					Songs
				</NavLink>
			</div>
		</li>
	</Aux>
);

export default specialNeeds;
