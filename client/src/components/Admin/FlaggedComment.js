import React, { Component } from "react";
import { connect } from "react-redux";
import { 
	initializeComment, 
	unloadComment,
	allowComment,
	deleteComment
 } from "../../store/actions";

class FlaggedComment extends Component {
	componentDidMount() {
		this.props.onInitializeComment(this.props.data.commentId);
	}
	componentWillUnmount() {
		this.props.onUnloadComment();
	}
	render() {
		let displayContent = (
			<div className="card-content">
				<h3>Nothing to display here</h3>
			</div>
		);
		if(this.props.comment) {
			const { comment } = this.props;
			displayContent = (
				<div className="card-content">
					<div className="row">
						<div className="col-md-6 mx-auto mt-4">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">
										{comment.name}
									</h5>
									<p className="card-text">
										{comment.text}
									</p>
							    <button 
							    className="card-link btn btn-info"
							    onClick={() => this.props.onAllowComment(comment._id)}
							    >
							    	Allow
							    </button>
							    <button
							    className="card-link btn btn-danger"
							    onClick={() => this.props.onDeleteComment(comment.article, comment._id)}
							    >
							    	Delete
							    </button>
								</div>
							</div>
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
	comment: state.admin.comment
});

const mapDispatchToProps = dispatch => ({
	onInitializeComment: commentId => dispatch(initializeComment(commentId)),
	onAllowComment: commentId => dispatch(allowComment(commentId)),
	onDeleteComment: (articleId, commentId) => dispatch(deleteComment(articleId, commentId)),
	onUnloadComment: () => dispatch(unloadComment())
});

export default connect(mapStateToProps, mapDispatchToProps)(FlaggedComment);