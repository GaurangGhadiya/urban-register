// reducers/someReducer.js
import {  GET_RELIGION_FALIURE, GET_RELIGION_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getReligion = (state = initialState, action) => {
	switch (action.type) {
		case GET_RELIGION_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_RELIGION_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getReligion;
