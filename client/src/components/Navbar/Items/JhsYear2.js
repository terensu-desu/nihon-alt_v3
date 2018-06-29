import React from "react";
import { NavLink } from "react-router-dom";
import Aux from "../../../hoc/Aux";

const jhsyear2 = props => (
	<Aux>
		<li className="nav-item dropdown mr-2">
			<a
				className="nav-link dropdown-toggle"
				href="#!"
				id="jhsy2Dropdown"
				role="button"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				JHS Year 2
			</a>
			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unit1/part1">
					Unit 1
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unit2/part1">
					Unit 2
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unit3/part1">
					Unit 3
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unit4/part1">
					Unit 4
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unit5/part1">
					Unit 5
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unit6/part1">
					Unit 6
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unit7/part1">
					Unit 7
				</NavLink>
				<div className="dropdown-divider" />
				<NavLink className="dropdown-item" to="/pages/jhsyear2/unitex/part1">
					Extras
				</NavLink>
			</div>
		</li>
	</Aux>
);

export default jhsyear2;
