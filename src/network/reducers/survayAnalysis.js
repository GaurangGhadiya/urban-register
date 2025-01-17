// reducers/someReducer.js
import { SURVAY_ANALYSIS_FALIURE, SURVAY_ANALYSIS_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const survayAnalysis = (state = initialState, action) => {
	switch (action.type) {
		case SURVAY_ANALYSIS_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case SURVAY_ANALYSIS_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default survayAnalysis;
