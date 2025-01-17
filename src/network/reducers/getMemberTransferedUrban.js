// reducers/someReducer.js
import { GET_MEMBER_STATUS_FALIURE, GET_MEMBER_STATUS_SUCCESS, GET_MEMBER_TRANSFER_URBAN_FALIURE, GET_MEMBER_TRANSFER_URBAN_SUCCESS } from "../action_types";

const initialState = {
    data: [],
    error: null,
};

const getMemberTransferedUrban = (state = initialState, action) => {
    switch (action.type) {
        case GET_MEMBER_TRANSFER_URBAN_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };
        case GET_MEMBER_TRANSFER_URBAN_FALIURE:
            return {
                ...state,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default getMemberTransferedUrban;
