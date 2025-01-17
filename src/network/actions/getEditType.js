// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_EDIT_TYPE_SUCCESS,
    GET_EDIT_TYPE_FALIURE,
} from "../action_types";
import {  encryptDataGet } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getEditTypeSuccess = (data) => ({
	type: GET_EDIT_TYPE_SUCCESS,
	payload: data,
});

export const getEditTypeFaliure = (error) => ({
	type: GET_EDIT_TYPE_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getEditType = () => {
	return async (dispatch) => {

		try {
			let params = {
				status : "true",
				masterName : "editType"
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("district")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getEditTypeSuccess(response));
		} catch (error) {
			dispatch(getEditTypeFaliure(error));
		}
	};
};
