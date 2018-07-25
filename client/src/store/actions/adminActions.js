import * as types from "./actionTypes";
import axios from "axios";


export const initializeList = () => dispatch => {
	axios.get(`/api/admin/init/`)
		.then(res => {
			dispatch({
				type: types.INITIALIZE_LIST,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
		});
};

export const initializeComment = (articleId, commentId) => dispatch => {
	axios.get(`/api/admin/comment/${articleId}/${commentId}`)
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