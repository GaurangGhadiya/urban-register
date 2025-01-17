// actions/someActions.js
import  { apiCall } from "../api";

import {
    GET_GENDER_SUCCESS,
    GET_GENDER_FALIURE,
    GET_FAMILY_UPDATE_LIST_SUCCESS,
    GET_FAMILY_UPDATE_LIST_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getFamilyUpdationListSuccess = (data) => ({
	type: GET_FAMILY_UPDATE_LIST_SUCCESS,
	payload: data,
});

export const getFamilyUpdationListFaliure = (error) => ({
	type: GET_FAMILY_UPDATE_LIST_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getFamilyUpdationList = (params,router) => {
	return async (dispatch) => {

		try {

			const response = await ApiGetNoAuth(`/urbanregister/getFamilyUpdationList?`, params);

			dispatch(getFamilyUpdationListSuccess(response));
		} catch (error) {
			dispatch(getFamilyUpdationListFaliure(error));
		}
	};
};
