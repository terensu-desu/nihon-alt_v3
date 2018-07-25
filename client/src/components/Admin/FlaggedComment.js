import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeComment } from "../../store/actions";

class FlaggedComment extends Component {
	componentDidMount() {
		this.props.onInitializeComment(this.props.data.articleId, this.props.data.commentId);
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
	onInitializeComment: (articleId, commentId) => dispatch(initializeComment(articleId, commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlaggedComment);