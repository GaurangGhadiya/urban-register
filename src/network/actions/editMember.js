// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    EDIT_MEMBER_SUCCESS,
    EDIT_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostNoAuth } from "../apiData";
// Action Creators
export const editMemberSuccess = (data) => ({
	type: EDIT_MEMBER_SUCCESS,
	payload: data,
});

export const editMemberFaliure = (error) => ({
	type: EDIT_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const editMember = (body,extra, startLoading, stopLoading) => {
	return async (dispatch) => {
startLoading()
		try {
			const response = await ApiPostNoAuth('/urbanregister/editMember', body)
            toast.success( response?.message)
            extra()
			dispatch(editMemberSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}			dispatch(editMemberFaliure(error));
		}
	};
};
