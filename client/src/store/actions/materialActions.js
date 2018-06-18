import axios from "axios";
import * as types from "./actionTypes";
import { startLoading, endLoading } from "./loadingActions";

/* FOR UPLOADING FILES TO DATABASE */
export const uploadMaterial = newMaterial => dispatch => {
	dispatch(startLoading());
	dispatch({ type: types.UPLOAD_START });
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
			dispatch({ type: types.UPLOAD_SUCCESS });
		})
		.catch(err => {
			dispatch(endLoading());
			dispatch({ type: types.UPLOAD_FAIL });
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			});
		});
};

/* FOR RETRIEVING FILES FROM DATABASE */
export const getMaterials = ({grade, unit, part}) => dispatch => {
	dispatch(startLoading());
	axios.get(`/api/materials/${grade}/${unit}/${part}`)
		.then(res => {
			dispatch(endLoading());
			dispatch({
				type: types.GET_MATERIALS_SUCCESS,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch(endLoading());
			dispatch({ type: types.GET_MATERIALS_FAIL });
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data
			});
		});
};
