// reducers/someReducer.js
import { GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS, GET_ECONOMIC_STATUS_FALIURE, GET_ECONOMIC_STATUS_SUCCESS, SURVAY_ANALYSIS_FALIURE, SURVAY_ANALYSIS_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getEconomicStatus = (state = initialState, action) => {
	switch (action.type) {
		case GET_ECONOMIC_STATUS_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_ECONOMIC_STATUS_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getEconomicStatus;
