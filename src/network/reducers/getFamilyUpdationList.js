// reducers/someReducer.js
import { GET_CATEGORY_FALIURE, GET_CATEGORY_SUCCESS, GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS, GET_FAMILY_UPDATE_LIST_FALIURE, GET_FAMILY_UPDATE_LIST_SUCCESS, GET_GENDER_FALIURE, GET_GENDER_SUCCESS, SURVAY_ANALYSIS_FALIURE, SURVAY_ANALYSIS_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getFamilyUpdationList = (state = initialState, action) => {
	switch (action.type) {
		case GET_FAMILY_UPDATE_LIST_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_FAMILY_UPDATE_LIST_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getFamilyUpdationList;
