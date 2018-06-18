import * as types from "../actions/actionTypes";

const initialState = {
	materials: [],
	unitParts: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case types.GET_MATERIALS_SUCCESS:
			return { 
				materials: action.payload.materials,
				unitParts: action.payload.unitParts
			};
		case types.GET_MATERIALS_FAIL:
			return { materials: [], unitParts: [] };
		default:
			return state;
	}
};

export default reducer;