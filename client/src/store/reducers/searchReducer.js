import * as types from "../actions/actionTypes";

const initialState = {
	query: "",
	results: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.HANDLE_SEARCH:
			return {
				...state,
				query: action.payload.query,
				results: action.payload.results
			};
		default:
			return state;
	}
};

export default reducer;