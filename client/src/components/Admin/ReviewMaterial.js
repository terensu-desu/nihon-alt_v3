import React, { Component } from "react";
import { connect } from "react-redux";

import { initializeMaterial } from "../../store/actions";

class ReviewMaterial extends Component {
	componentDidMount() {
		this.props.onInitializeMaterial(this.props.data.materialId);
	}
	// add componentDidUnmount to remove data from store
	render() {
		let displayContent = (
			<div className="card-content">
				<h3>Nothing to display here</h3>
			</div>
		);
		if(this.props.material) {
			displayContent = (
				<div className="card-content">
					<h3>hello</h3>
					<p>hello2</p>
				</div>
			);
		}
		console.log(this.props.material)
		return (
			<div>
				{displayContent}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	material: state.admin.material
});

const mapDispatchToProps = dispatch => ({
	onInitializeMaterial: materialId => dispatch(initializeMaterial(materialId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewMaterial);