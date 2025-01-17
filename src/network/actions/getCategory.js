// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getCategorySuccess = (data) => ({
	type: GET_CATEGORY_SUCCESS,
	payload: data,
});

export const getCategoryFaliure = (error) => ({
	type: GET_CATEGORY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getCategory = () => {
	return async (dispatch) => {

		try {
			let params = {
				status : "true",
				masterName : "category"
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("category")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getCategorySuccess(response));
		} catch (error) {
			dispatch(getCategoryFaliure(error));
		}
	};
};
