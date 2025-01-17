// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    GET_FAMILY_BY_ID_SUCCESS,
    GET_FAMILY_BY_ID_FALIURE,
    UPDATE_FAMILY_SUCCESS,
    UPDATE_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth, ApiPostNoAuth } from "../apiData";
// Action Creators
export const updateFamilySuccess = (data) => ({
	type: UPDATE_FAMILY_SUCCESS,
	payload: data,
});

export const updateFamilyFaliure = (error) => ({
	type: UPDATE_FAMILY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const updateFamily = (family_id, body, extraUpdate) => {
	return async (dispatch) => {

		try {

			const response = await ApiPostNoAuth(`/urbanregister/updateFamily?family_id=${encryptDataGet(family_id)}`, body);

toast.success(response?.message)

extraUpdate()
			dispatch(updateFamilySuccess(response));
		} catch (error) {
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}			dispatch(updateFamilyFaliure(error));
		}
	};
};
