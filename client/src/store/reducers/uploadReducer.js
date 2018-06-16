import * as types from "../actions/actionTypes";

const initalState = {
	uploadSuccess: false
};

const reducer = (state = initalState, action) => {
	switch(action.type) {
		case types.UPLOAD_START:
			return { uploadSuccess: false };
		case types.UPLOAD_SUCCESS:
			return { uploadSuccess: true };
		case types.UPLOAD_FAIL:
			return { uploadSuccess: false };
		default:
			return state;
	}
};

export default reducer;