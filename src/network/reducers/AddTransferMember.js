// reducers/someReducer.js
import { ADD_TRANSFER_MEMBER_FALIURE, ADD_TRANSFER_MEMBER_SUCCESS, GET_CATEGORY_FALIURE, GET_CATEGORY_SUCCESS, GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS, GET_GENDER_FALIURE, GET_GENDER_SUCCESS, SURVAY_ANALYSIS_FALIURE, SURVAY_ANALYSIS_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const AddTransferMember = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TRANSFER_MEMBER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case ADD_TRANSFER_MEMBER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default AddTransferMember;
