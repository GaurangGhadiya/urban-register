// reducers/someReducer.js
import { GET_WARD_FALIURE, GET_WARD_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getWard = (state = initialState, action) => {
	switch (action.type) {
		case GET_WARD_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_WARD_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getWard;
