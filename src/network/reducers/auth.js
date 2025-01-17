// reducers/someReducer.js
import { VERIFY_FALIURE, VERIFY_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const authDetails = (state = initialState, action) => {
	switch (action.type) {
		case VERIFY_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case VERIFY_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default authDetails;
