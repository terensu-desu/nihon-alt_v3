import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleSearch } from "../../store/actions/";

class SearchBar extends Component {
	state = {	query: "" };
	onChange = event => {
		this.setState({	query: event.target.value	});
	};
	onSubmit = event => {
		event.preventDefault();
		this.props.onHandleSearch(this.state, this.props.history);
		this.setState({ query: "" });
	};
	render() {
		return (
			<li className="nav-item dropdown mr-2">
				<a
					className="nav-link dropdown-toggle"
					href="#!"
					id="navbarDropdown"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					Search
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<form className="form-inline p-2" onSubmit={this.onSubmit}>
						{/* TODO: Adjust TextFieldGroup to take in className and aria-label */}
				    <input 
				    className="form-control" 
				    type="search" 
				    placeholder="Search" 
				    aria-label="Search" 
				    value={this.state.query}
				    onChange={this.onChange}/>
				    <button className="btn btn-outline mt-2 mx-auto" type="submit">Search</button>
				  </form>
				</div>
			</li>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onHandleSearch: (query, history) => dispatch(handleSearch(query, history))
});

export default connect(null, mapDispatchToProps)(withRouter(SearchBar))