import * as types from "../actions/actionTypes";

const initialState = {
	page: 0,
	blogItems: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case type.INITIALIZE_BLOG:
			return {
				...state,
				blogItems: action.payload
			};
		default:
			return state;
	}
};

export default reducer;