// reducers/someReducer.js
import {GET_MUNICIPAL_FALIURE, GET_MUNICIPAL_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getMunicipalities = (state = initialState, action) => {
	switch (action.type) {
		case GET_MUNICIPAL_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_MUNICIPAL_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getMunicipalities;
