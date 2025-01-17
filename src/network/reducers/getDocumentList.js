// reducers/someReducer.js
import {  GET_DOCUMENT_LIST_FALIURE, GET_DOCUMENT_LIST_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getDocumentList = (state = initialState, action) => {
	switch (action.type) {
		case GET_DOCUMENT_LIST_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_DOCUMENT_LIST_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getDocumentList;
