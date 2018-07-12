import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeComment } from "../../store/actions";

class FlaggedComment extends Component {
	state = {
		data: null
	};
	componentDidMount() {
		console.log(this.props.onInitializeComment(this.props.data.article, this.props.data.comment));
	}
	render() {
		return (
			<div className="card-content">
				<h3>NAME HERE</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore perferendis porro laboriosam cupiditate natus reiciendis, autem quisquam ullam fuga. Praesentium iste delectus consequuntur ab quod id, qui tenetur magni? Ullam!</p>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onInitializeComment: (articleId, commentId) => dispatch(initializeComment(articleId, commentId))
});

export default connect(null, mapDispatchToProps)(FlaggedComment);