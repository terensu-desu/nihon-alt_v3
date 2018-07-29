import * as types from "../actions/actionTypes";

const initialState = {
	list: null,
	comment: null,
	material: null
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
		case types.INITIALIZE_MATERIAL:
			return {
				...state,
				material: action.payload
			};
		case types.UNLOAD_LIST: 
			return {
				...state,
				list: null
			}
		case types.UNLOAD_COMMENT: 
			return {
				...state,
				comment: null
			}
		case types.UNLOAD_MATERIAL: 
			return {
				...state,
				material: null
			}
		default:
			return state;
	}
};

export default reducer;