import * as types from "./actionTypes";
import axios from "axios";

// INITIALIZES THE LIST TO VIEW ANY FLAGGED OR UNVERIFIED ITEMS
// IN ADMIN PAGE
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

// INITIALIZES THE FLAGGED COMMENT THE ADMIN CLICKED IN THE LIST
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

// INITIALIZES THE UNVERIFIED MATERIAL THE ADMIN CLICKED IN THE LIST
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

// SETS INITIALIZED LIST TO NULL
export const unloadList = () => dispatch => {
	dispatch({
		type: types.UNLOAD_LIST
	});
};

// SETS INITIALIZED COMMENT TO NULL
export const unloadComment = () => dispatch => {
	dispatch({
		type: types.UNLOAD_COMMENT
	});
};

// SETS INITIALIZED MATERIAL TO NULL
export const unloadMaterial = () => dispatch => {
	dispatch({
		type: types.UNLOAD_MATERIAL
	});
};

// UNFLAGS COMMENT
export const allowComment = commentId => dispatch => {
	axios.get(`/api/admin/allow-comment/${commentId}`)
		.then(res => {
			dispatch({
				type: types.UNLOAD_COMMENT
			});
		})
		.catch(err => console.log("Error allowing comment. Deleted?"));
};

// VERIFIES AN UPLOAD AND ADDS/UPDATES INFORMATION
export const verifyMaterial = (materialId, data) => dispatch => {
	axios.post(`/api/admin/verify-material/${materialId}`, data)
		.then(res => {
			dispatch({
				type: types.UNLOAD_MATERIAL
			});
		})
		.catch(err => console.log("Error verifing material."));
};

// REMOVES UPLOADED MATERIAL (FAILS ADMIN REVIEW)
export const removeMaterial = materialId => dispatch => {
	axios.delete(`/api/admin/remove-material/${materialId}`)
		.then(res => {
			dispatch({
				type: types.UNLOAD_MATERIAL
			});
		})
		.catch(err => console.log("Error deleting material."));
};
