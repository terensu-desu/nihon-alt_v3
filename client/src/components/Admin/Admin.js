import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeList } from "../../store/actions";
import FlaggedComment from "./FlaggedComment";

class Admin extends Component {
	state = {
		content: null,
		type: null,
		data: null,
		list: []
	};
	componentDidMount() {
		// call handleInitializeList
	}
	handleInitializeList = () => {
		// use action to get flagged comments and unverified materials
		// put into redux store
		// this is accessable by componentDidMount and WillReceiveProps
	};
	handleListClick = (type, data) => {
		this.setState({
			content: true,
			type: type,
			data: data
		});
	};
	render() {
		let displayContent = null;
		let alertList = null;
		if(this.state.content) {
			if(this.state.type === "comment") {
				displayContent = <FlaggedComment data={this.state.data} />;
			} else if(this.state.type === "material") {
				// displayContent = <ReviewMaterial data={this.state.data} />;
			} else if(this.state.type === "blog") {
				// displayContent = <CreateBlogEntry submitForm={this.handleBlogSubmit} />;
			}
		}
		/*if(this.props.admin.list) {
			alertList = this.props.admin.list(item => {
				if(item.type === "comment") {
					return (
						<li className="list-group-item">
					  	<a
					  	href="#!"
					  	onClick={() => this.handleListClick(item.type, {articleId: item.articleId, commentId: item.commentId})}>
					  		FLAGGED COMMENT
					  	</a>
					  </li>
					);
				} else if(item.type === "material") {
						return (
							<li className="list-group-item">
						  	<a
						  	href="#!"
						  	onClick={() => this.handleListClick(item.type, {materialId: item.materialId})}>
						  		FLAGGED COMMENT
						  	</a>
						  </li>
					);
				}
			})
			.slice(0, 8);
		}*/
		return (
			<div className="container">
				<div className="row">
					{/* Gravatar and Greeting to Admin */}
					<div className="col-md-2">
						<img
							className="rounded-circle d-block mx-auto"
							style={{ width: "100px", marginRight: "5px" }}
							src={this.props.user.avatar}
							alt="Avatar"
						/>
					</div>
					<div className="col-md-10">
						<h2 className="text-center">
							Welcome to your admin dashboard {this.props.user.name}!
						</h2>
					</div>
				</div>
				<div className="row text-center mt-2">
					{/* Alerts / Blog Entries / Create Blog Post */}
					<div className="col-md-2">
						<button className="btn btn-danger" disabled>ALERTS</button>
					</div>
					<div className="col-md-5">
						<button className="btn btn-info">View Blog Entries</button>
					</div>
					<div className="col-md-5">
						<button className="btn btn-info">Create Blog Post</button>
					</div>
				</div>
				<div className="row mt-2">
					{/* List of Alerts */}
					<div className="col-md-2">
						<ul className="list-group text-center card">
							{alertList}
						  <li className="list-group-item">
						  	<a 
						  	href="#!"
						  	onClick={() => this.handleListClick("comment", {articleId: "5b386e93e765401d7ba233e3", commentId: "5b3fbdb8d1ea6f0014aa9c45"})}>
						  		FLAGGED COMMENT1
						  	</a>
						  </li>
						  <li className="list-group-item">
						  	<a href="#!">FLAGGED COMMENT</a>
						  </li>
						  <li className="list-group-item">
						  	<a href="#!">UPLOADED MATERIAL</a>
						  </li>
						  <li className="list-group-item">
						  	<a href="#!">UPLOADED MATERIAL</a>
						  </li>
						  <li className="list-group-item">
						  	<a href="#!">UPLOADED MATERIAL</a>
						  </li>
						  <li className="list-group-item">
						  	<a href="#!">FLAGGED COMMENT</a>
						  </li>
						  <li className="list-group-item">
						  	<a href="#!">UPLOADED MATERIAL</a>
						  </li>
						</ul>
					</div>
					{/* Content box - Routes to either /blog/create, shows file or comment details */}
					<div className="col-md-10">
						<div className="card" style={{height: "100%"}}>
							{this.state.id}
							{displayContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	handleInitializeList: () => dispatch(initializeList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);