// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_MUNICIPAL_SUCCESS,
    GET_MUNICIPAL_FALIURE,
    GET_BLOCK_SUCCESS,
    GET_BLOCK_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getBlockSuccess = (data) => ({
	type: GET_BLOCK_SUCCESS,
	payload: data,
});

export const getBlockFaliure = (error) => ({
	type: GET_BLOCK_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getBlock = (body) => {
	return async (dispatch) => {

		try {
			let params = {
				status : "true",
				masterName : "block",
				parentId: body?.districtCode
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);

			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.districtCode)}&masterName=${encryptData("municipal")}`
			// );
			// let responseData = decryptData(response?.data?.data)

			dispatch(getBlockSuccess(response));
		} catch (error) {
			dispatch(getBlockFaliure(error));
		}
	};
};
