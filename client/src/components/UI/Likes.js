import React from "react";
import classnames from "classnames";

const likes = props => {
	let likeButton = (
		<button 
    type="button" 
    className="btn btn-light mr-1"
    disabled>
      <i className="fas fa-thumbs-up"></i>
      <span className="badge badge-light">{props.likes}</span>
    </button>
	);
	let dislikeButton = (
		<button 
    type="button" 
    className="btn btn-light mr-1"
    disabled>
      <i className="text-secondary fas fa-thumbs-down"></i>
    </button>
	);
	if(props.auth) {
		likeButton = (
			<button 
      type="button" 
      className="btn btn-light mr-1"
      onClick={props.onLikeClick}>
        <i className={classnames("fas fa-thumbs-up", {
        	"text-info": props.findUserLikes
        })}></i>
        <span className="badge badge-light">{props.likes}</span>
      </button>
		);
		dislikeButton = (
			<button 
      type="button" 
      className="btn btn-light mr-1"
      onClick={props.onUnlikeClick}>
        <i className="text-secondary fas fa-thumbs-down"></i>
      </button>
		);
	}
	return (
		<span>
  		{likeButton}
  		{dislikeButton}
  	</span>
	);
};

export default likes;