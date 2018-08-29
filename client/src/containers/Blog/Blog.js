import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initializeBlog, unloadBlog } from "../../store/actions/";
import BlogListItem from "./Items/BlogListItem";
import Spinner from "../../components/UI/Spinner";

class Blog extends Component {
	state = { page: 0 };
	componentDidMount() {
		this.props.onInitializeBlog();
	}
	componentWillUnmount() {
		this.props.onUnloadBlog();
	}
	handleNextClick = () => {
		if(this.state.page !== this.props.blog.pageMax - 1) {
			this.setState(prevState => {
				return {
					page: prevState.page + 1
				}
			});
		}
	};
	handlePrevClick = () => {
		if(this.state.page !== 0) {
			this.setState(prevState => {
				return {
					page: prevState.page - 1
				}
			});
		}
	};
	render() {
		const chunkArray = [[0, 4], [4, 8], [8, 12], [12, 16]];
		let sliceChunk = chunkArray[this.state.page];
		const listItems = this.props.blog.blogItems.slice(sliceChunk[0], sliceChunk[1]).map(blog => 
			<BlogListItem key={blog._id} blog={blog} />
		);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h2 className="text-center">Otsukare News</h2>
						<div className="list-group">
						  {listItems ? listItems : <Spinner />}
						</div>
					</div>
					<div className="mx-auto">
						<nav aria-label="Blog item navigation">
						  <ul className="pagination">
						    <li className="page-item">
						      <a className="page-link" href="#!" aria-label="Previous" onClick={this.handlePrevClick}>
						        <span aria-hidden="true">&laquo;</span>
						        <span className="sr-only">Previous</span>
						      </a>
						    </li>
						    <li className="page-item"><a className="page-link" disabled>View more</a></li>
						    <li className="page-item">
						      <a className="page-link" href="#!" aria-label="Next" onClick={this.handleNextClick}>
						        <span aria-hidden="true">&raquo;</span>
						        <span className="sr-only">Next</span>
						      </a>
						    </li>
						  </ul>
						</nav>
					</div>
				</div>
			</div>
		);
	}
};

Blog.propTypes = {
	loading: PropTypes.bool.isRequired,
	blog: PropTypes.object.isRequired,
	onInitializeBlog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	loading: state.loading.loading,
	blog: state.blog
});

const mapDispatchToProps = dispatch => ({
	onInitializeBlog: () => dispatch(initializeBlog()),
	onUnloadBlog: () => dispatch(unloadBlog())
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);