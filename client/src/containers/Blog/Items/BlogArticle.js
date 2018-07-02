import React, { Component } from "react";
import { connect } from "react-redux"
import Moment from "react-moment";
import { retrieveArticle } from "../../../store/actions/";

class BlogArticle extends Component {
	componentDidMount() {
		this.props.onRetrieveArticle(this.props.match.params.id)
	}
	render() {
		const { article } = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="card">
						  <div className="card-body">
						    <h5 className="card-title">{article.title}</h5>
						    <h6 className="card-subtitle mb-2 text-muted">by {article.name}</h6>
						    <small><Moment format="YYYY/MM/DD">{article.date}</Moment></small>
						    <p className="card-text">{article.content}</p>
						    <a href="#!" className="card-link">Comments/Likes</a>
						  </div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	article: state.blog.targetArticle
});

const mapDispatchToProps = dispatch => ({
	onRetrieveArticle: id => dispatch(retrieveArticle(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogArticle);