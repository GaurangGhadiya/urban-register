// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    SEPARATE_MEMBER_SUCCESS,
    SEPARATE_MEMBER_FALIURE,
    ADD_TRANSFER_MEMBER_SUCCESS,
    ADD_TRANSFER_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";
// Action Creators
export const AddTransferMemberSuccess = (data) => ({
	type: ADD_TRANSFER_MEMBER_SUCCESS,
	payload: data,
});

export const AddTransferMemberFaliure = (error) => ({
	type: ADD_TRANSFER_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const AddTransferMember = (body,extra) => {
	return async (dispatch) => {

		try {
			const response = await ApiPostNoAuth('/urbanregister/AddTransferMember', body)
            toast.success( response?.message)
            extra()
			dispatch(AddTransferMemberSuccess(response));
		} catch (error) {
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}			dispatch(AddTransferMemberFaliure(error));
		}
	};
};
