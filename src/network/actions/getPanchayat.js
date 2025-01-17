// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_PANCHAYAT_SUCCESS,
    GET_PANCHAYAT_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getPanchayatSuccess = (data) => ({
	type: GET_PANCHAYAT_SUCCESS,
	payload: data,
});

export const getPanchayatFaliure = (error) => ({
	type: GET_PANCHAYAT_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getPanchayat = (body) => {
	return async (dispatch) => {

		try {
			let params = {
				status : "true",
				masterName : "panchayat",
				parentId: body?.municipalId
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.districtCode)}&masterName=${encryptData("municipal")}`
			// );
			// let responseData = decryptData(response?.data?.data)

			dispatch(getPanchayatSuccess(response));
		} catch (error) {
			dispatch(getPanchayatFaliure(error));
		}
	};
};
