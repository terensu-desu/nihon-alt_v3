import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMaterial } from "../../store/actions/";
import Aux from "../../hoc/Aux";
import Spinner from "../../components/UI/Spinner";
import TextFieldGroup from "../../components/UI/TextFieldGroup";
import TextAreaFieldGroup from "../../components/UI/TextAreaFieldGroup";
import SelectListGroup from "../../components/UI/SelectListGroup";
import FileUploadInputGroup from "../../components/UI/FileUploadInputGroup";

class Upload extends Component {
	state = {
		title: "",
		instructions: "",
		grade: "",
		file: "",
		fileUpload: "Choose File"
	};
	componentWillReceiveProps(nextProps) {
		if(nextProps.uploadSuccess) {
				this.setState({
				title: "",
				instructions: "",
				grade: "",
				file: "",
				fileUpload: "Choose File"
			});
		}
	}
	onSubmit = event => {
		event.preventDefault();
		let uploadData = new FormData();
		uploadData.append("file", this.state.file);
		uploadData.append("title", this.state.title);
		uploadData.append("instructions", this.state.instructions);
		uploadData.append("grade", this.state.grade);
		uploadData.append("username", this.props.auth.user.name);
		uploadData.append("avatar", this.props.auth.user.avatar);
		this.props.onAddMaterial(uploadData);
	};
	onChange = event => {
		if(event.target.name === "fileUpload") {
			this.setState({
				fileUpload: event.target.files["0"].name,
				file: event.target.files[0]
			});
		} else {
			this.setState({ [event.target.name]: event.target.value });
		}
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
		let form = (
			<Aux>
				<TextFieldGroup 
					name="title"
					placeholder="* Title (Eg. Battleship - Marvel Characters Version)"
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
				<FileUploadInputGroup 
					name="fileUpload"
					value={this.state.fileUpload}
					error={errors.fileUpload}
					onChange={this.onChange}
				/>
				
				<input type="submit" className="btn btn-info btn-block mt-4" />
			</Aux>
		);
		if(this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md 8 m-auto">
						<h2 className="text-center">Upload A File</h2>
						<p className="lead text-center">People helping people, it's a beautiful thing</p>
						<form onSubmit={this.onSubmit} encType="multipart/form-data">
							{form}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Upload.propTypes = {
	auth: PropTypes.object.isRequired,
	uploadSuccess: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	uploadSuccess: state.upload.uploadSuccess,
	errors: state.errors,
	loading: state.loading.loading
});

const mapDispatchToProps = dispatch => ({
	onAddMaterial: newMaterial => dispatch(addMaterial(newMaterial))
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);