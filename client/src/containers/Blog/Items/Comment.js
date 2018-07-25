import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { flagComment, deleteComment } from "../../../store/actions/";

class Comment extends Component {
	handleDeleteClick = event => {
		event.preventDefault();
		this.props.onDeleteClick(this.props.articleId, this.props.comment._id);
	};
	handleFlagClick = event => {
		event.preventDefault();
		console.log("eroeri")
		this.props.onFlagClick(this.props.articleId, this.props.comment._id);
	}
	render() {
		const {
			avatar,
			name,
			date,
			text,
			user: commentUserId } = this.props.comment;
		const authUserId = this.props.authUser.id;
		return (
			<li className="list-group-item bg-light mb-3">
				<a href="#!" onClick={this.handleFlagClick} className="float-right text-danger">
					<i 
						className="fa fa-flag" 
						aria-hidden="true">
					</i>
				</a>
				<div className="row">
					<div className="col-sm-4 col-md-2">
			      <img
							className="rounded-circle d-block mx-auto"
							style={{ width: "100px", marginRight: "5px" }}
							src={avatar}
							alt="Avatar"
						/>
					</div>
					<div className="col-sm-8 col-md-3">
						<h5 className="mt-2">{name}</h5>
			      <small>
			      	<Moment format="YYYY/MM/DD">{date}</Moment>
			      </small>
					</div>
					<div className="col-sm-12 col-md-7">
						<p className="mt-2 mb-0">{text}</p>
					</div>
		    </div>
		    {authUserId === commentUserId && (
					<div className="row">
						<button 
						className="mt-2 ml-auto mr-2 btn btn-danger"
						onClick={this.handleDeleteClick}>
							DELETE
						</button>
					</div>
				)}
			</li>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onDeleteClick: (articleId, commentId) => dispatch(deleteComment(articleId, commentId)),
	onFlagClick: (articleId, commentId) => dispatch(flagComment(articleId, commentId))
});

export default connect(null, mapDispatchToProps)(Comment);