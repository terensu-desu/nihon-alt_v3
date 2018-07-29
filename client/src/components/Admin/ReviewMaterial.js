import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
	initializeMaterial,
	unloadMaterial,
	verifyMaterial,
	removeMaterial,
	//downloadMaterial
} from "../../store/actions";

import TextFieldGroup from "../../components/UI/TextFieldGroup";
import TextAreaFieldGroup from "../../components/UI/TextAreaFieldGroup";
import FileUploadInputGroup from "../../components/UI/FileUploadInputGroup";

class ReviewMaterial extends Component {
	state = {
		title: "",
		instructions: "",
		grade: "",
		unit: "",
		part: "",
		keywords: "",
		file: "",
		fileUpload: "Choose Screenshot file",
	};
	componentDidMount() {
		this.props.onInitializeMaterial(this.props.data.materialId);
		setTimeout(() => {
			const { material } = this.props;
			this.setState({
				title: material.title,
				instructions: material.instructions,
				grade: material.grade,
				unit: material.unit,
				part: material.part,
				keywords: material.keywords.join(", ")
			});
		}, 500);
	}
	componentWillUnmount() {
		this.props.onUnloadMaterial();
	}
	handleDownload = materialId => {
		console.log("Attempting download")
		axios.get(`/api/materials/download/${materialId}`)
			.then(res => console.log(res));
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
	onSubmit = event => {
		event.preventDefault();
		const { material } = this.props;
		let verifiedData = new FormData();
		verifiedData.append("file", this.state.file);
		verifiedData.append("title", this.state.title);
		verifiedData.append("instructions", this.state.instructions);
		verifiedData.append("grade", this.state.grade);
		verifiedData.append("unit", this.state.unit);
		verifiedData.append("part", this.state.part);
		verifiedData.append("keywords", this.state.keywords);
		this.props.onVerifyMaterial(material._id, verifiedData);
	};
	render() {
		let displayContent = (
			<div className="card-content">
				<h3>Nothing to display here</h3>
			</div>
		);
		if(this.props.material) {
			const { material, errors } = this.props;
			displayContent = (
				<div className="card-content">
					<form
						onSubmit={this.onSubmit}
						className="px-5 mt-4"
						encType="multipart/form-data"
					>
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
					</form>
					<div className="row mt-2">
						<div className="col-md-2 offset-md-4">
							<a
								className="btn btn-info"
								href={`http://localhost:5000/api/materials/download/${material._id}`}
								//onClick={() => this.handleDownload(material._id)}
							>
								DOWNLOAD
							</a>
						</div>
						<div className="col-md-2">
							<button 
								className="btn btn-danger"
								onClick={() => this.props.onRemoveMaterial(material._id)}
								>
								DELETE
							</button>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div>
				{displayContent}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	material: state.admin.material,
	errors: state.errors
});

const mapDispatchToProps = dispatch => ({
	onInitializeMaterial: materialId => dispatch(initializeMaterial(materialId)),
	onVerifyMaterial: (materialId, data) => dispatch(verifyMaterial(materialId, data)),
	onRemoveMaterial: materialId => dispatch(removeMaterial(materialId)),
	//onDownloadMaterial: () => dispatch(downloadMaterial()),
	onUnloadMaterial: () => dispatch(unloadMaterial())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewMaterial);


/*

<div className="row">
						<div className="col-md-6 mx-auto mt-4">
							<ul className="list-group">
							  <li className="list-group-item">
							  	<span className="text-danger">Title</span> - {material.title}
							  </li>
							  <li className="list-group-item">
							  	<span className="text-danger">User</span> - {material.username}
							  </li>
							  <li className="list-group-item">
							  	<span className="text-danger">Grade</span> - {material.grade}
							  </li>
							  <li className="list-group-item">
							  	<span className="text-danger">Unit</span> - {material.unit}
							  </li>
							  <li className="list-group-item">
							  	<span className="text-danger">Part</span> - {material.part}
							  </li>
							  <li className="list-group-item">
							  	<span className="text-danger">Keywords</span> - {material.keywords.join(", ")}
							  </li>
							  <li className="list-group-item">
							  	<span className="text-danger">File path</span> - {material.filePath}
							  </li>
							  <li className="list-group-item">
							  	<span className="text-danger">Verified</span> - {material.verified ? "True" : "False"}
							  </li>
							</ul>
						</div>
					</div>

*/