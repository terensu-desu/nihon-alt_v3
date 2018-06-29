import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { handleSearch } from "../../store/actions/";
import TextFieldGroup from "../../components/UI/TextFieldGroup";

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
						{/* TODO: Adjust TextFieldGroup to take aria-label */}
						<TextFieldGroup 
							name="search"
							placeholder="Search"
							value={this.state.query}
							error={""}
							onChange={this.onChange}
						/>				    
				    <button 
					    className="btn btn-outline mt-2 mx-auto" 
					    type="submit"
							disabled={this.state.query === ""}>
							Search
						</button>
				  </form>
				</div>
			</li>
		);
	}
}

SearchBar.propTypes = {
	onHandleSearch: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
	onHandleSearch: (query, history) => dispatch(handleSearch(query, history))
});

export default connect(null, mapDispatchToProps)(withRouter(SearchBar))