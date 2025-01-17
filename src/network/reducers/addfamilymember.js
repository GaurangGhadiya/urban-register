import { ADD_FAMILY_FALIURE, ADD_FAMILY_MEMBER_FALIURE, ADD_FAMILY_MEMBER_SUCCESS, ADD_FAMILY_SUCCESS} from "../action_types";

const initialState = {
	data: [],
	error: null,
};

const addfamilymember = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FAMILY_MEMBER_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case ADD_FAMILY_MEMBER_FALIURE:
			return {
				...state,
				data: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default addfamilymember;
