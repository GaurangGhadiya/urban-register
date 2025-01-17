// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_WARD_SUCCESS,
    GET_WARD_FALIURE,
    GET_UPDATE_MEMBER_HISTORY_SUCCESS,
    GET_UPDATE_MEMBER_HISTORY_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getUpdateHistorySuccess = (data) => ({
	type: GET_UPDATE_MEMBER_HISTORY_SUCCESS,
	payload: data,
});

export const getUpdateHistoryFaliure = (error) => ({
	type: GET_UPDATE_MEMBER_HISTORY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getUpdateHistory = (body) => {
	return async (dispatch) => {

		try {

			const response = await ApiGetNoAuth(`/urbanregister/getMemberUpdationList?`, body);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)

			dispatch(getUpdateHistorySuccess(response));
		} catch (error) {
			dispatch(getUpdateHistoryFaliure(error));
		}
	};
};
