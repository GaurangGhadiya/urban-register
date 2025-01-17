// reducers/someReducer.js
import {  GET_RELIGION_FALIURE, GET_RELIGION_SUCCESS, GET_UPDATE_MEMBER_HISTORY_FALIURE, GET_UPDATE_MEMBER_HISTORY_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getUpdateHistory = (state = initialState, action) => {
	switch (action.type) {
		case GET_UPDATE_MEMBER_HISTORY_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_UPDATE_MEMBER_HISTORY_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getUpdateHistory;
