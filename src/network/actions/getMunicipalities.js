// actions/someActions.js
import { apiCall, survayAnalysis } from "../api";

import {
	GET_MUNICIPAL_SUCCESS,
	GET_MUNICIPAL_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getMunicipalSuccess = (data) => ({
	type: GET_MUNICIPAL_SUCCESS,
	payload: data,
});

export const getMunicipalFaliure = (error) => ({
	type: GET_MUNICIPAL_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getMunicipalities = (body, startLoading = () => { }, stopLoading = () => { }) => {
	return async (dispatch) => {
		startLoading()
		try {
			let params = {
				status: "true",
				masterName: "municipal",
				parentId: body?.districtCode
			}
			const response = await ApiGetNoAuth(`/master-data?`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.districtCode)}&masterName=${encryptData("municipal")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getMunicipalSuccess(response));
			stopLoading()
		} catch (error) {

			stopLoading()
			dispatch(getMunicipalFaliure(error));
		}
	};
};
