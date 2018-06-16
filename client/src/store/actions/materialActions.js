import axios from "axios";
import * as types from "./actionTypes";
import { startLoading, endLoading } from "./loadingActions";

export const addMaterial = newMaterial => dispatch => {
	dispatch(startLoading());
	axios({
		method: "post",
		url: "/api/materials/",
		data: newMaterial,
		config: {
			headers: { "Content-Type": "multipart/form-data" }
		}
	})
		.then(res => {
			dispatch(endLoading());
			dispatch({ type: types.CLEAR_ERRORS	});
			console.log("[RESPONSE AT REDUX] ", res);
		})
		.catch(err => {
			dispatch(endLoading());
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			});
		});
};
