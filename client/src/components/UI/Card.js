import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../store/actions/";
import Likes from "./Likes";

class Card extends Component {
	onLikeClick = itemId => {
		this.props.onAddLike(itemId);
	};
	onUnlikeClick = itemId => {
		this.props.onRemoveLike(itemId);
	};
	findUserLikes = likes => {
		const {authUser} = this.props;
		if(likes.filter(like => like.user === authUser.id).length > 0) {
			return true;
		} else { return false }
	};
	render() {
		const {
			title,
			instructions,
			filePath,
			likes,
			id,
			authStatus,
			username,
			grade,
			unit,
			part
		} = this.props;
		const gradeString = grade.toUpperCase().replace(/\d/, " ") + grade.slice(-1);
		const unitString = unit.toUpperCase().replace(/\d/, " ") + unit.slice(-1);
		const partString = part.toUpperCase().replace(/\d/, " ") + part.slice(-1);
		return (
			<div className="card">
				<img 
				className="card-img-top"
				src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b1a117c92ca0030b584bfd26c70bc659&auto=format&fit=crop&w=1375&q=80" 
				alt="I M A G E" />
		    <div className="card-body">
		      <h5 className="card-title">{title}</h5>
		      <p className="small file-details">
		      	{gradeString}, {unitString}, {partString}
		      </p>
		      <p className="card-text">
		      {instructions}
		      </p>
		      <p className="card-text">
		      	<a href={filePath}>Download this file.</a>
		      </p>
		      <Likes 
		      	auth={authStatus}
		      	likes={likes.length}
		      	onLikeClick={() => this.onLikeClick(id)}
		      	onUnlikeClick={() => this.onUnlikeClick(id)}
		      	findUserLikes={() => this.findUserLikes(likes)} />
		    </div>
		    <div className="card-footer text-muted">
		    	Submitted by {username.split(" ")[0]}
		    </div>
			</div>
		);
	}
}

Card.propTypes = {
	authStatus: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	instructions: PropTypes.string.isRequired,
	filePath: PropTypes.string.isRequired,
	likes: PropTypes.array.isRequired,
	grade: PropTypes.string.isRequired,
	unit: PropTypes.string.isRequired,
	part: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	onAddLike: PropTypes.func.isRequired,
	onRemoveLike: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
	onAddLike: itemId => dispatch(addLike(itemId)),
	onRemoveLike: itemId => dispatch(removeLike(itemId))
});

export default connect(null, mapDispatchToProps)(Card);