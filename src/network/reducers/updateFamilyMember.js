// reducers/someReducer.js
import { UPDATE_FAMILY_MEMBER_FALIURE, UPDATE_FAMILY_MEMBER_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const updateFamilyMember = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_FAMILY_MEMBER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case UPDATE_FAMILY_MEMBER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default updateFamilyMember;
