import React, { Component } from "react";
import { connect } from "react-redux"
import Moment from "react-moment";
import { 
	retrieveArticle,
	addArticleLike,
	removeArticleLike } from "../../../store/actions/";
import CommentField from "./CommentField";
import Likes from "../../../components/UI/Likes";

class BlogArticle extends Component {
	componentDidMount() {
		this.props.onRetrieveArticle(this.props.match.params.id)
	}
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
		const { article, authStatus } = this.props;
		let comments = <li className="list-group-item">Try comment</li>;
		if(article.comments && article.comments.length > 0) {
			comments = article.comments.map(comment => (
				<li key={comment._id} className="list-group-item">{comment.text}</li>
			));
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="card">
						  <div className="card-body">
						    <h5 className="card-title">{article.title}</h5>
						    <h6 className="card-subtitle mb-2 text-muted">
							    by {article.name}
						    </h6>
						    <small>
						    	<Moment format="YYYY/MM/DD">{article.date}</Moment>
						    </small>
						    <p className="card-text">{article.content}</p>
						    <p className="card-text">Like this article?</p>
						    <Likes 
						    auth={authStatus}
				      	likes={article.likes ? article.likes.length : 0}
				      	onLikeClick={() => this.onLikeClick(article._id)}
				      	onUnlikeClick={() => this.onUnlikeClick(article._id)}
				      	findUserLikes={() => this.findUserLikes(article.likes)} />
						  </div>
						  <div className="card-footer text-muted">
						    Comments - <small>{
						    	article.comments 
						    	? article.comments.length 
						    	: `0`} comments</small>
						  </div>
						  <div className="card-body">
						  	<ul className="list-group list-group-flush">
						  		{comments}
						  	</ul>
						  	<CommentField articleId={article._id} />
						  </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	authStatus: state.auth.isAuthenticated,
	authUser: state.auth.user,
	article: state.blog.targetArticle
});

const mapDispatchToProps = dispatch => ({
	onRetrieveArticle: id => dispatch(retrieveArticle(id)),
	onAddLike: id => dispatch(addArticleLike(id)),
	onRemoveLike: id => dispatch(removeArticleLike(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogArticle);