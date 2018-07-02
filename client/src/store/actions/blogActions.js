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
				type: types.UPDATE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
}

/* REMOVE LIKES */
export const removeArticleLike = itemId => dispatch => {
	axios.post(`/api/posts/unlike/${itemId}`)
		.then(res => {
			dispatch({
				type: types.UPDATE_ARTICLE,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
}
