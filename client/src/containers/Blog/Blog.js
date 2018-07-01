import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { initializeBlog } from "../../store/actions/";
import BlogListItem from "./Items/BlogListItem";

class Blog extends Component {
	state = { page: 0 };
	componentDidMount() {
		this.props.onInitializeBlog();
	}
	componentWillReceiveProps(nextProps) {
		if(this.state.pages !== nextProps.pages) {
			this.props.onInitializeBlog(nextProps.page);
		}
	}
	handleNextClick = () => {
		//if(this.state.page !== this.props.lastPage) {
			this.setState(prevState => {
				return {
					page: prevState.page + 1
				}
			});
		//}
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
		/*const blog1 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore non officia dolor libero magni reiciendis. Mollitia pariatur nobis voluptas odit delectus officia quasi suscipit, nisi dolore error, quis quos in?Lorem ipsum dolor sit amet, consectetur adipisicing elit. At maiores veniam necessitatibus eius, illum minima alias. Praesentium itaque porro ullam aspernatur minus. Itaque quae quo beatae soluta. Placeat, consequatur, nam!",
			date: "May 8th, 2018",
			id: 1214
		};
		const blog2 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus",
			date: "May 7th, 2018",
			id: 1215
		};
		const blog3 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus",
			date: "May 6th, 2018",
			id: 1216
		};
		const blog4 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus",
			date: "May 5th, 2018",
			id: 1217
		};
		const blogs = [blog1, blog2, blog3, blog4];*/
		let sliceStart = 0;
		let sliceEnd = 4;
		// figure out simple func for this
		const listItems = this.props.blog.blogItems.slice(0,4).map(blog => 
			<BlogListItem key={blog.id} blog={blog} />
		);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h2 className="text-center">Otsukare News {this.state.page}</h2>
						<div className="list-group">
						  {listItems}
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
	onInitializeBlog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	loading: state.loading.loading,
	blog: state.blog
});

const mapDispatchToProps = dispatch => ({
	onInitializeBlog: () => dispatch(initializeBlog())
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);