import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeBlog } from "../../store/actions/";
import BlogListItem from "./Items/BlogListItem";

class Blog extends Component {
	state = { page: 0 };
	componentDidMount() {
		this.props.onInitializeBlog(this.state.page);
	}
	componentWillReceiveProps(nextProps) {
		if(this.state.pages !== nextProps.pages) {
			this.props.onInitializeBlog(nextProps.page);
		}
	}
	render() {
		const blog1 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus",
			date: "May 5th, 2018",
			id: 1214
		};
		const blog2 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus",
			date: "May 5th, 2018",
			id: 1215
		};
		const blog3 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus",
			date: "May 5th, 2018",
			id: 1216
		};
		const blog4 = {
			title: "Test Title Here",
			preview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt quo sapiente recusandae modi natus",
			date: "May 5th, 2018",
			id: 1217
		};
		const blogs = [blog1, blog2, blog3, blog4];
		const listItems = blogs.map(blog => 
			<BlogListItem key={blog.id} blog={blog} />
		);
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h2 className="text-center">Otsukare News</h2>
						<div className="list-group">
						  {listItems}
						</div>
					</div>
					<div className="mx-auto">
						<nav aria-label="Blog item navigation">
						  <ul className="pagination">
						    <li className="page-item">
						      <a className="page-link" href="#!" aria-label="Previous">
						        <span aria-hidden="true">&laquo;</span>
						        <span className="sr-only">Previous</span>
						      </a>
						    </li>
						    <li className="page-item"><a className="page-link" href="#!">1</a></li>
						    <li className="page-item"><a className="page-link" href="#!">2</a></li>
						    <li className="page-item"><a className="page-link" href="#!">3</a></li>
						    <li className="page-item">
						      <a className="page-link" href="#!" aria-label="Next">
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	onInitializeBlog: page => dispatch(initializeBlog(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);