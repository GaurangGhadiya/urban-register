// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_WARD_SUCCESS,
    GET_WARD_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getWardSuccess = (data) => ({
	type: GET_WARD_SUCCESS,
	payload: data,
});

export const getWardFaliure = (error) => ({
	type: GET_WARD_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getWard = (body, startLoading = () => { }, stopLoading = () => { }) => {
	return async (dispatch) => {
startLoading()
// debugger
		try {
			let params = {
				status : "true",
				masterName : "ward",
				parentId: body?.municipalId

			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getWardSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			dispatch(getWardFaliure(error));
		}
	};
};
