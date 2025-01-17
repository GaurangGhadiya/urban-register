// reducers/someReducer.js
import { SEPARATE_MEMBER_FALIURE, SEPARATE_MEMBER_SUCCESS, UPDATE_FAMILY_FALIURE, UPDATE_FAMILY_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const separateMember = (state = initialState, action) => {
	switch (action.type) {
		case SEPARATE_MEMBER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case SEPARATE_MEMBER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default separateMember;
