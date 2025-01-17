// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    TRANSFER_MEMBER_SUCCESS,
    TRANSFER_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";
// Action Creators
export const TransferMemberSuccess = (data) => ({
	type: TRANSFER_MEMBER_SUCCESS,
	payload: data,
});

export const TransferMemberFaliure = (error) => ({
	type: TRANSFER_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const TransferMember = (body,extra) => {
	return async (dispatch) => {
		try {
			const response = await ApiPostNoAuth('/urbanregister/TransferMember', body)
            toast.success( response?.message)
            extra()
			dispatch(TransferMemberSuccess(response));
		} catch (error) {
            toast.error(error?.message)
			dispatch(TransferMemberFaliure(error));
		}
	};
};
