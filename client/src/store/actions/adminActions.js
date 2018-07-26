import * as types from "./actionTypes";
import axios from "axios";

export const initializeList = () => dispatch => {
	axios.get(`/api/admin/initialize-list`)
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

export const initializeComment = commentId => dispatch => {
	axios.get(`/api/admin/comment/${commentId}`)
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

export const initializeMaterial = materialId => dispatch => {
	axios.get(`/api/admin/material/${materialId}`)
		.then(res => {
			dispatch({
				type: types.INITIALIZE_MATERIAL,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err);
		});
};