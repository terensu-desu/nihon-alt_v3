import React, { Component } from "react";
import { connect } from "react-redux";
import FlaggedComment from "./FlaggedComment";

class Admin extends Component {
	state = {
		content: null,
		type: null,
		data: null
	};
	componentDidMount() {
		this.setState({
			content: null,
			type: null,
			data: null
		});
	}
	handleClick = (type, data) => {
		this.setState({
			content: true,
			type: type,
			data: data
		});
	};
	render() {
		let displayContent = null;
		if(this.state.content) {
			if(this.state.type === "comment") {
				displayContent = <FlaggedComment data={this.state.data} />;
			} else if(this.state.type === "material") {
				// displayContent = <ReviewMaterial data={this.state.data} />;
			} else if(this.state.type === "blog") {
				// displayContent = <CreateBlogEntry />;
			}
		}
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
						  <li className="list-group-item">
						  	<a 
						  	href="#!"
						  	onClick={() => this.handleClick("comment", {article: "5b386e93e765401d7ba233e3", comment: "5b3fbdb8d1ea6f0014aa9c45"})}>
						  		FLAGGED COMMENT
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

export default connect(mapStateToProps)(Admin);