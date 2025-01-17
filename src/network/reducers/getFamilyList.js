import {  GET_FAMILY_BY_ID_FALIURE, GET_FAMILY_BY_ID_SUCCESS, GET_FAMILY_LIST_FALIURE, GET_FAMILY_LIST_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getFamilyList = (state = initialState, action) => {
	switch (action.type) {
		case GET_FAMILY_LIST_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_FAMILY_LIST_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getFamilyList;
