// reducers/someReducer.js
import { GET_MEMBER_STATUS_FALIURE, GET_MEMBER_STATUS_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getMemberStatus = (state = initialState, action) => {
	switch (action.type) {
		case GET_MEMBER_STATUS_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_MEMBER_STATUS_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getMemberStatus;
