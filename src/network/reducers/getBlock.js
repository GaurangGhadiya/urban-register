import {  EDIT_MEMBER_FALIURE, EDIT_MEMBER_SUCCESS, GET_BLOCK_FALIURE, GET_BLOCK_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const getBlock = (state = initialState, action) => {
	switch (action.type) {
		case GET_BLOCK_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case GET_BLOCK_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default getBlock;
