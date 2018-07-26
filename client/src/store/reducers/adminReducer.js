import * as types from "../actions/actionTypes";

const initialState = {
	list: null,
	comment: {},
	material: {}
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.INITIALIZE_LIST:
			return {
				...state,
				list: action.payload
			};
		case types.INITIALIZE_COMMENT:
			return {
				...state,
				comment: action.payload
			};
		default:
			return state;
	}
};

export default reducer;