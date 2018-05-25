import * as types from "../actions/actionTypes";

const initialState = {
	loading: false
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.START_LOADING:
			return { loading: true };
		case types.END_LOADING:
			return { loading: false };
		default:
			return state;
	}
};

export default reducer;