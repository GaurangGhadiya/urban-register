import {  EDIT_MEMBER_FALIURE, EDIT_MEMBER_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const editMember = (state = initialState, action) => {
	switch (action.type) {
		case EDIT_MEMBER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case EDIT_MEMBER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default editMember;
