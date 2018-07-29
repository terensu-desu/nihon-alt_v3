import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeList, unloadList } from "../../store/actions";
import Spinner from "../../components/UI/Spinner";
import FlaggedComment from "./FlaggedComment";
import ReviewMaterial from "./ReviewMaterial";

class Admin extends Component {
	state = {
		content: null,
		type: null,
		data: null,
		list: []
	};
	componentDidMount() {
		this.props.onInitializeList();
	}
	componentWillUnmount() {
		this.props.onUnloadList();
	}
	handleListClick = (type, data) => {
		this.setState({
			content: true,
			type: type,
			data: data
		});
	};
	render() {
		let displayContent = null;
		let alertSpace = <Spinner />;
		let commentList = null;
		let materialList = null;
		if(this.state.content) {
			if(this.state.type === "comment") {
				displayContent = <FlaggedComment data={this.state.data} />;
			} else if(this.state.type === "material") {
				displayContent = <ReviewMaterial data={this.state.data} />;
			} else if(this.state.type === "blog") {
				// displayContent = <CreateBlogEntry submitForm={this.handleBlogSubmit} />;
			}
		}
		if(this.props.list) {
			if(this.props.list.comments) {
				commentList = this.props.list.comments.map(item => (
					<li className="list-group-item" key={item._id}>
				  	<a
				  	href="#!"
				  	onClick={() => this.handleListClick("comment", {commentId: item._id})}>
				  		Flagged User Comment
				  	</a>
				  </li>
				)).slice(0,4);
			}
			if(this.props.list.materials) {
				materialList = this.props.list.materials.map(item => (
					<li className="list-group-item" key={item._id}>
				  	<a
				  	href="#!"
				  	onClick={() => this.handleListClick("material", {materialId: item._id})}>
				  		Unverified Community File
				  	</a>
				  </li>
				)).slice(0,4);
			}
			alertSpace = null;
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
							{alertSpace}
							{commentList}
							{materialList}
						</ul>
					</div>
					{/* Content box - Routes to either /blog/create, shows file or comment details */}
					<div className="col-md-10">
						<div className="card" style={{height: "55vh"}}>
							{displayContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	user: state.auth.user,
	list: state.admin.list
});

const mapDispatchToProps = dispatch => ({
	onInitializeList: () => dispatch(initializeList()),
	onUnloadList: () => dispatch(unloadList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
