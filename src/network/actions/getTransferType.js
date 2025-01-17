// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_RELIGION_SUCCESS,
    GET_RELIGION_FALIURE,
    GET_TRANSFER_TYPE_SUCCESS,
    GET_TRANSFER_TYPE_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getTransferTypeSuccess = (data) => ({
	type: GET_TRANSFER_TYPE_SUCCESS,
	payload: data,
});

export const getTransferTypeFaliure = (error) => ({
	type: GET_TRANSFER_TYPE_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getTransferType = () => {
	return async (dispatch) => {

		try {
			let params = {
				status : "true",
				masterName : "transferType",
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);

			dispatch(getTransferTypeSuccess(response));
		} catch (error) {
			dispatch(getTransferTypeFaliure(error));
		}
	};
};
