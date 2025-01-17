// reducers/someReducer.js
import { GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS, GET_PROFESSION_FALIURE, GET_PROFESSION_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getProfession = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFESSION_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_PROFESSION_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getProfession;
