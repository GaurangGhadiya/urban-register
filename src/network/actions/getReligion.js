// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_RELIGION_SUCCESS,
    GET_RELIGION_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getReligionSuccess = (data) => ({
	type: GET_RELIGION_SUCCESS,
	payload: data,
});

export const getReligionFaliure = (error) => ({
	type: GET_RELIGION_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getReligion = () => {
	return async (dispatch) => {

		try {
			let params = {
				status : "true",
				masterName : "religion",
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("religion")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getReligionSuccess(response));
		} catch (error) {
			dispatch(getReligionFaliure(error));
		}
	};
};
