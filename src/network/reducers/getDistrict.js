// reducers/someReducer.js
import { GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getDistrict = (state = initialState, action) => {
	switch (action.type) {
		case GET_DISTRICT_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_DISTRICT_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getDistrict;
