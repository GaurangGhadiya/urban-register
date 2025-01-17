// reducers/someReducer.js
import { DELETE_FAMILY_MEMBER_FALIURE, DELETE_FAMILY_MEMBER_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const deleteFamilyMember = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_FAMILY_MEMBER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case DELETE_FAMILY_MEMBER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default deleteFamilyMember;
