// reducers/someReducer.js
import {  GET_RELIGION_FALIURE, GET_RELIGION_SUCCESS, GET_UPDATE_MEMBER_HISTORY_FALIURE, GET_UPDATE_MEMBER_HISTORY_SUCCESS, GET_VERIFICATION_COUNT_FALIURE, GET_VERIFICATION_COUNT_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getVerificationReport = (state = initialState, action) => {
	switch (action.type) {
		case GET_VERIFICATION_COUNT_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_VERIFICATION_COUNT_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getVerificationReport;
