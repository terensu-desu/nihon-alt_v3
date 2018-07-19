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
		case types.UNLOAD_MATERIALS:
			return { materials: [], unitParts: [] };
		case types.UPDATE_MATERIAL:
			const updateIndex = state.materials.map(item => item._id).indexOf(action.payload._id);
			const updatedMaterials = [...state.materials]
			updatedMaterials[updateIndex] = action.payload;
			return {
				...state,
				materials: updatedMaterials
			}
		default:
			return state;
	}
};

export default reducer;