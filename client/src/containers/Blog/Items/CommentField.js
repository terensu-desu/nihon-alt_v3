import React, { Component } from "react";
import { connect } from  "react-redux";
import { submitComment } from "../../../store/actions/";
import TextAreaFieldGroup from "../../../components/UI/TextAreaFieldGroup";

class CommentField extends Component {
	state = {	content: "" };
	onChange = event => {
		this.setState({ content: event.target.value });
	};
	onSubmit = event => {
		event.preventDefault();
		const commentData = {
			content: this.state.content,
			name: this.props.user.name,
			avatar: this.props.user.avatar
		};
		this.props.onSubmitComment(this.props.articleId, commentData);
		this.setState({ cotent: "" });
	}
	render() {
		const errors = this.props.errors || {};
		return (
			<form onSubmit={this.onSubmit}>
				<TextAreaFieldGroup 
					name="comment"
					placeholder="Type here!"
					value={this.state.content}
					error={errors.comment}
					extraClass="form-control-lg"
					info="Comments may be subject to moderation."
					onChange={this.onChange}
				/>
				<button className="btn btn-outline-success">Submit</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	errors: state.errors
});

const mapDispatchToProps = dispatch => ({
	onSubmitComment: (articleId, comment) => dispatch(submitComment(articleId, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentField);