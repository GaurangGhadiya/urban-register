// reducers/someReducer.js
import {  CHECK_USER_FALIURE, CHECK_USER_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const checkUser = (state = initialState, action) => {
	switch (action.type) {
		case CHECK_USER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case CHECK_USER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default checkUser;
