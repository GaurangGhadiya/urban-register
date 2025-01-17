import {  GET_FAMILY_MEMBER_FALIURE, GET_FAMILY_MEMBER_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getfamilymember = (state = initialState, action) => {
	switch (action.type) {
		case GET_FAMILY_MEMBER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_FAMILY_MEMBER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getfamilymember;
