import * as types from "./actionTypes";

export const initializeBlog = page => dispatch => {
	dispatch({
		type: types.INITIALIZE_BLOG
	})
};