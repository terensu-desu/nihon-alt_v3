import * as types from "../actions/actionTypes";

const initialState = {
	page: 0,
	blogItems: [],
	pageMax: 0
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.INITIALIZE_BLOG:
			return {
				...state,
				blogItems: action.payload.blogItems,
				pageMax: action.payload.pageMax
			};
		default:
			return state;
	}
};

export default reducer;