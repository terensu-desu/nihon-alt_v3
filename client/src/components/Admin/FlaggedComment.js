import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeComment } from "../../store/actions";

class FlaggedComment extends Component {
	componentDidMount() {
		this.props.onInitializeComment(this.props.data.commentId);
	}
	// add componentDidUnmount to remove data from store
	render() {
		let displayContent = (
			<div className="card-content">
				<h3>Nothing to display here</h3>
			</div>
		);
		if(this.props.comment) {
			displayContent = (
				<div className="card-content">
					<h3>{this.props.comment.name}</h3>
					<p>{this.props.comment.text}</p>
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
	comment: state.admin.comment
});

const mapDispatchToProps = dispatch => ({
	onInitializeComment: commentId => dispatch(initializeComment(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlaggedComment);