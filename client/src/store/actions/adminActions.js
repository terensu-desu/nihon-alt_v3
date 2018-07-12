import * as types from "./actionTypes";
import axios from "axios";

export const initializeComment = (articleId, commentId) => dispatch => {
	axios.get(`/api/posts/comment/${articleId}/${commentId}`)
		.then(res => {
			dispatch({
				type: types.INITIALIZE_COMMENT,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
		});
};