import React, { Component } from "react";
import { connect } from "react-redux";

import { initializeMaterial } from "../../store/actions";

class ReviewMaterial extends Component {
	componentDidMount() {
		this.props.onInitializeComment(this.props.data.materialId);
	}
	render() {
		let displayContent = (
			<div className="card-content">
				<h3>Nothing to display here</h3>
			</div>
		);
		if(this.props.admin.comment) {
			displayContent = (
				<div className="card-content">
					<h3>{this.props.admin.comment.namne}</h3>
					<p>{this.props.admin.comment.text}</p>
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
	admin: state.admin
});

const mapDispatchToProps = dispatch => ({
	onInitializeComment: materialId => dispatch(initializeMaterial(materialId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewMaterial);