import * as types from "../actions/actionTypes";

const initialState = {
	page: 0,
	blogItems: [],
	targetArticle: {},
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
		case types.RETRIEVE_ARTICLE:
			return {
				...state,
				targetArticle: action.payload
			};
		default:
			return state;
	}
};

export default reducer;