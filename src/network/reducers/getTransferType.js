// reducers/someReducer.js
import {  GET_RELIGION_FALIURE, GET_RELIGION_SUCCESS, GET_TRANSFER_TYPE_FALIURE, GET_TRANSFER_TYPE_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getTransferType = (state = initialState, action) => {
	switch (action.type) {
		case GET_TRANSFER_TYPE_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_TRANSFER_TYPE_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getTransferType;
