import * as types from "../actions/actionTypes";

const initalState = {};

const reducer = (state = initalState, action) => {
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