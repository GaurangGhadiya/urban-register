import { ADD_FAMILY_FALIURE, ADD_FAMILY_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const addFamily = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FAMILY_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case ADD_FAMILY_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default addFamily;
