// reducers/someReducer.js
import {  CHECK_USER_FALIURE, CHECK_USER_SUCCESS, GET_DASHBOARD_COUNT_FALIURE, GET_DASHBOARD_COUNT_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const dashboardCount = (state = initialState, action) => {
	switch (action.type) {
		case GET_DASHBOARD_COUNT_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_DASHBOARD_COUNT_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default dashboardCount;
