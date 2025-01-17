// reducers/someReducer.js
import { GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS, GET_RATION_DETAILS_FALIURE, GET_RATION_DETAILS_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getRationDetails = (state = initialState, action) => {
	switch (action.type) {
		case GET_RATION_DETAILS_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_RATION_DETAILS_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getRationDetails;
