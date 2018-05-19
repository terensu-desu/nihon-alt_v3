import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../../components/UI/TextFieldGroup";
import TextAreaFieldGroup from "../../components/UI/TextAreaFieldGroup";
import SelectListGroup from "../../components/UI/SelectListGroup";

class Upload extends Component {
	state = {
		title: "",
		instructions: "",
		grade: "",

	};
	onSubmit = event => {
		const newMaterial = {};
		//send
	};
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const errors = this.props.errors || {};
		const options = [
			{ label: "* Select A Grade", value: 0 },
			{ label: "JHS Year 1", value: "JHS Year 1" },
			{ label: "JHS Year 2", value: "JHS Year 2" },
			{ label: "JHS Year 3", value: "JHS Year 3" },
			{ label: "Special Needs", value: "Special Needs" },
			{ label: "High School", value: "High School" }
		];
		return (
			<div className="container">
				<div className="row">
					<div className="col-md 8 m-auto">
						<h1 className="display-4 text-center">Upload A File</h1>
						<p className="lead text-center">People helping people, it's a beautiful thing</p>
						<form onSubmit={this.onSubmit}>
							<TextFieldGroup 
							name="title"
							placeholder="* Title (Eg. Battleship - Marvel Characters)"
							value={this.state.title}
							error={errors.title}
							onChange={this.onChange}
							/>
							<TextAreaFieldGroup
								name="instructions"
								placeholder="* Detailed instructions"
								value={this.state.instructions}
								error={errors.instructions}
								info="Instructions should explain the basic use of the exercise."
								onChange={this.onChange}
							/>
							<SelectListGroup
								name="grade"
								value={this.state.grade}
								error={errors.grade}
								options={options}
								info="What grade level is this exercise for?"
								onChange={this.onChange}
							/>
							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Upload.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps)(Upload);