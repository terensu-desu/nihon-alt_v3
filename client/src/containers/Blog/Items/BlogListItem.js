import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const blogListItem = ({blog}) => {
	return (
		<Link
			to={`/blog/${blog._id}`}
			className="list-group-item list-group-item-action flex-column align-items-start mb-2"
		>
			<div className="d-flex w-100 justify-content-between">
				<h5 className="mb-1">{blog.title}</h5>
				<small><Moment format="YYYY/MM/DD">{blog.date}</Moment></small>
			</div>
			<p className="mb-2">by {blog.name}</p>
			<p className="mb-1">
				{`${blog.content.slice(0, 280)}...`}
			</p>
			<small>Click to read and comment</small>
		</Link>
	);
};

export default blogListItem;
