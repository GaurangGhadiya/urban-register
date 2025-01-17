// reducers/someReducer.js
import { GET_DISTRICT_FALIURE, GET_DISTRICT_SUCCESS, GET_EDIT_TYPE_FALIURE, GET_EDIT_TYPE_SUCCESS } from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getEditType = (state = initialState, action) => {
	switch (action.type) {
		case GET_EDIT_TYPE_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_EDIT_TYPE_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getEditType;
