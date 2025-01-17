// reducers/someReducer.js
import {  TRANSFER_MEMBER_LIST_FALIURE, TRANSFER_MEMBER_LIST_SUCCESS, TRANSFER_MEMBER_SUCCESS, UPDATE_FAMILY_FALIURE, UPDATE_FAMILY_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const memberTransferList = (state = initialState, action) => {
	switch (action.type) {
		case TRANSFER_MEMBER_LIST_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case TRANSFER_MEMBER_LIST_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default memberTransferList;
