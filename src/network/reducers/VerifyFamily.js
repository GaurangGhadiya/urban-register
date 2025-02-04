// reducers/someReducer.js
import { UPDATE_FAMILY_FALIURE, UPDATE_FAMILY_SUCCESS, VERIFY_FAMILY_FALIURE, VERIFY_FAMILY_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const VerifyFamily = (state = initialState, action) => {
	switch (action.type) {
		case VERIFY_FAMILY_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case VERIFY_FAMILY_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default VerifyFamily;
