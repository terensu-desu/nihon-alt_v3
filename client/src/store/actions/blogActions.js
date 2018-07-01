import * as types from "./actionTypes";
import axios from "axios";

export const initializeBlog = () => dispatch => {
	axios.get("api/posts/")
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