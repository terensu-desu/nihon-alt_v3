import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadMaterial } from "../../store/actions/";
import Aux from "../../hoc/AuxWrapper";
import Spinner from "../../components/UI/Spinner";
import TextFieldGroup from "../../components/UI/TextFieldGroup";
import TextAreaFieldGroup from "../../components/UI/TextAreaFieldGroup";
import ConditionalSelectWrapper from "../../components/UI/ConditionalSelectWrapper";
import FileUploadInputGroup from "../../components/UI/FileUploadInputGroup";

class Upload extends Component {
	state = {
		title: "",
		instructions: "",
		grade: "",
		unit: "",
		part: "",
		keywords: "",
		file: "",
		fileUpload: "Choose File",
		showToast: false
	};
	componentWillReceiveProps(nextProps) {
		if(nextProps.uploadSuccess) {
			this.setState({
				title: "",
				instructions: "",
				grade: "",
				unit: "",
				part: "",
				keywords: "",
				file: "",
				fileUpload: "Choose File",
				showToast: true
			});
			setTimeout(() => {
				this.setState({ showToast: false });
			}, 2000);	
		}
	}
	onSubmit = event => {
		event.preventDefault();
		let uploadData = new FormData();
		uploadData.append("file", this.state.file);
		uploadData.append("title", this.state.title);
		uploadData.append("instructions", this.state.instructions);
		uploadData.append("grade", this.state.grade);
		uploadData.append("unit", this.state.unit);
		uploadData.append("part", this.state.part);
		uploadData.append("keywords", this.state.keywords);
		uploadData.append("username", this.props.auth.user.name);
		uploadData.append("avatar", this.props.auth.user.avatar);
		this.props.onUploadMaterial(uploadData);
	};
	onChange = event => {
		if(event.target.name === "fileUpload" && event.target.files["0"]) {
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
		let toastStyle = {
			transform: "translateY(-100vh)"
		};
		if(this.state.showToast) {
			toastStyle = {
				transform: "translateY(0)"
			};
		}
		let form = (
			<Aux>
				<TextFieldGroup 
					name="title"
					placeholder="* Title (Eg. Battleship - Marvel Characters Version)"
					value={this.state.title}
					error={errors.title}
					extraClass="form-control-lg"
					onChange={this.onChange}
				/>
				<TextAreaFieldGroup
					name="instructions"
					placeholder="* Detailed instructions"
					value={this.state.instructions}
					error={errors.instructions}
					extraClass="form-control-lg"
					info="Instructions should explain the basic use of the exercise."
					onChange={this.onChange}
				/>
				<ConditionalSelectWrapper 
					gradeValue={this.state.grade}
					unitValue={this.state.unit}
					partValue={this.state.part}
					extraClass="form-control-lg"
					onChange={this.onChange}
					errors={errors}
				/>
				<TextFieldGroup 
					name="keywords"
					placeholder="Keywords"
					value={this.state.keywords}
					error={errors.keywords}
					extraClass="form-control-lg"
					onChange={this.onChange}
					info="Separate keywords with commas."
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
				<div className="toast" style={toastStyle}>
					<span>Thanks for your contribution!</span>
				</div>
			</div>
		);
	}
}

Upload.propTypes = {
	auth: PropTypes.object.isRequired,
	uploadSuccess: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	onUploadMaterial: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	uploadSuccess: state.upload.uploadSuccess,
	errors: state.errors,
	loading: state.loading.loading
});

const mapDispatchToProps = dispatch => ({
	onUploadMaterial: newMaterial => dispatch(uploadMaterial(newMaterial))
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);