import React from "react";

const blogListItem = ({blog}) => {
	return (
		<a
			href="#!"
			className="list-group-item list-group-item-action flex-column align-items-start mb-2"
		>
			<div className="d-flex w-100 justify-content-between">
				<h5 className="mb-1">{blog.title}</h5>
				<small>{blog.date}</small>
			</div>
			<p className="mb-1">
				{blog.preview}
			</p>
			<small>Click to read and comment</small>
		</a>
	);
};

export default blogListItem;
