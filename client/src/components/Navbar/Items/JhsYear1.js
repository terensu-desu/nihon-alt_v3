import React from "react";
import { NavLink } from "react-router-dom";
import Aux from "../../../hoc/AuxWrapper";

const jhsyear1 = props => (
	<Aux>
		<li className="nav-item dropdown mr-2">
			<a
				className="nav-link dropdown-toggle"
				href="#!"
				id="jhsy1Dropdown"
				role="button"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				JHS Year 1
			</a>
			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit0/part1">
					Unit 0
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit1/part1">
					Unit 1
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit2/part1">
					Unit 2
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit3/part1">
					Unit 3
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit4/part1">
					Unit 4
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit5/part1">
					Unit 5
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit6/part1">
					Unit 6
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit7/part1">
					Unit 7
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit8/part1">
					Unit 8
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit9/part1">
					Unit 9
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit10/part1">
					Unit 10
				</NavLink>
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unit11/part1">
					Unit 11
				</NavLink>
				<div className="dropdown-divider" />
				<NavLink className="dropdown-item" to="/pages/jhsyear1/unitex/part1">
					Extras
				</NavLink>
			</div>
		</li>
	</Aux>
);

export default jhsyear1;
