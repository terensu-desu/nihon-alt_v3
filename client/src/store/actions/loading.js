import * as actionTypes from "./actionTypes";
export const startLoading = () => {
	return {
		type: actionTypes.START_LOADING
	};
};

export const endLoading = () => {
	return {
		type: actionTypes.END_LOADING
	};
};
