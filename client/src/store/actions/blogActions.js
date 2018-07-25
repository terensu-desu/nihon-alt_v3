import * as types from "./actionTypes";
import axios from "axios";

export const initializeBlog = () => dispatch => {
	axios.get("/api/posts/")
		.then(res => {
			const payload = {
				blogItems: res.data,
				pageMax: Math.ceil(res.data.length / 4)
			};
			dispatch({
				type: types.INITIALIZE_BLOG,
				payload: payload
			});
		})
		.catch(err => {
			console.log(err);
		});
};

export const unloadBlog = () => dispatch => {
	dispatch({
		type: types.UNLOAD_BLOG
	});
};

export const unloadArticle = () => dispatch => {
	dispatch({
		type: types.UNLOAD_ARTICLE
	});
};

export const retrieveArticle = id => dispatch => {
	axios.get(`/api/posts/${id}`)
		.then(res => {
			dispatch({
				type: types.RETRIEVE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
		});
};

/* ADD LIKES */
export const addArticleLike = itemId => dispatch => {
	axios.post(`/api/posts/like/${itemId}`)
		.then(res => {
			dispatch({
				type: types.RETRIEVE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

/* REMOVE LIKES */
export const removeArticleLike = itemId => dispatch => {
	axios.post(`/api/posts/unlike/${itemId}`)
		.then(res => {
			dispatch({
				type: types.RETRIEVE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

/* ADD COMMENT */
export const submitComment = (articleId, comment) => dispatch => {
	axios.post(`/api/posts/comment/${articleId}`, comment)
		.then(res => {
			dispatch({
				type: types.RETRIEVE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: {comment: "Please log in to comment."}
			});
		});
};

/* DELETE COMMENT */
export const deleteComment = (articleId, commentId) => dispatch => {
	axios.delete(`/api/posts/comment/${articleId}/${commentId}`)
		.then(res => {
			dispatch({
				type: types.RETRIEVE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			});
		});
};

/* ADD FLAG TO COMMENT */
export const flagComment = (articleId, commentId) => dispatch => {
	axios.get(`/api/posts/comment/${articleId}/${commentId}`)
		.then(res => {
			dispatch({
				type: types.RETRIEVE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			});
		});
};