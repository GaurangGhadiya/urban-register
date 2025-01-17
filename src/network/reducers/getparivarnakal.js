// reducers/someReducer.js
import { GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS, GET_PARIVAR_NAKAL_FALIURE, GET_PARIVAR_NAKAL_SUCCESS, GET_PROFESSION_FALIURE, GET_PROFESSION_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getparivarnakal = (state = initialState, action) => {
	switch (action.type) {
		case GET_PARIVAR_NAKAL_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_PARIVAR_NAKAL_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getparivarnakal;
