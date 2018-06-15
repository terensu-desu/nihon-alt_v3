import axios from "axios";
import * as types from "./actionTypes";
import { startLoading, endLoading } from "./loadingActions";

export const addMaterial = newMaterial => dispatch => {
	dispatch(startLoading());
	console.log("[FROM REDUX ACTION]", newMaterial);
	axios.post("/api/materials/", newMaterial)
		.then(res => {
			dispatch(endLoading());
			console.log(res);
		})
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			})
		});
}