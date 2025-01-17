// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    GET_FAMILY_BY_ID_SUCCESS,
    GET_FAMILY_BY_ID_FALIURE,
    UPDATE_FAMILY_SUCCESS,
    UPDATE_FAMILY_FALIURE,
    VERIFY_FAMILY_SUCCESS,
    VERIFY_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth, ApiPostNoAuth } from "../apiData";
// Action Creators
export const VerifyFamilySuccess = (data) => ({
	type: VERIFY_FAMILY_SUCCESS,
	payload: data,
});

export const VerifyFamilyFaliure = (error) => ({
	type: VERIFY_FAMILY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const VerifyFamily = ( body, extra) => {
	return async (dispatch) => {

		try {
			const response = await ApiPostNoAuth(`/urbanregister/VerifyFamily?user_id=${encryptDataGet(body?.user_id?.toString())}&family_id=${encryptDataGet(body?.family_id)}`, {});

toast.success(response?.message)
extra()

			dispatch(VerifyFamilySuccess(response));
		} catch (error) {
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}			dispatch(VerifyFamilyFaliure(error));
		}
	};
};
