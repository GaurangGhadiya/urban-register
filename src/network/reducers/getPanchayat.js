import {  EDIT_MEMBER_FALIURE, EDIT_MEMBER_SUCCESS, GET_BLOCK_FALIURE, GET_BLOCK_SUCCESS, GET_PANCHAYAT_FALIURE, GET_PANCHAYAT_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getPanchayat = (state = initialState, action) => {
	switch (action.type) {
		case GET_PANCHAYAT_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_PANCHAYAT_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getPanchayat;
