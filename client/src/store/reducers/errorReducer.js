import * as types from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.GET_ERRORS:
			return action.payload;
		case types.CLEAR_ERRORS:
			return {};
		default:
			return state;
	}
};

export default reducer;