// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_MEMBER_STATUS_SUCCESS,
    GET_MEMBER_STATUS_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getMemberStatusSuccess = (data) => ({
	type: GET_MEMBER_STATUS_SUCCESS,
	payload: data,
});

export const getMemberStatusFaliure = (error) => ({
	type: GET_MEMBER_STATUS_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getMemberStatus = () => {
	return async (dispatch) => {

		try {
			let params = {
				status : "true",
				masterName : "memberStatus"
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&masterName=${encryptData("memberStatus")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getMemberStatusSuccess(response));
		} catch (error) {
			dispatch(getMemberStatusFaliure(error));
		}
	};
};
