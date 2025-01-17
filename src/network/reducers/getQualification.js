// reducers/someReducer.js
import { GET_QUALIFICATION_FALIURE, GET_QUALIFICATION_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getQualification = (state = initialState, action) => {
	switch (action.type) {
		case GET_QUALIFICATION_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_QUALIFICATION_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getQualification;
