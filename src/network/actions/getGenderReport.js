// actions/someActions.js

import {
	GET_FAMILY_LIST_SUCCESS,
	GET_FAMILY_LIST_FALIURE,
	GET_DASHBOARD_COUNT_SUCCESS,
	GET_DASHBOARD_COUNT_FALIURE,
    GET_GENDER_REPORT_SUCCESS,
    GET_GENDER_REPORT_FALIURE,
} from "../action_types";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getGenderReportSuccess = (data) => ({
	type: GET_GENDER_REPORT_SUCCESS,
	payload: data,
});

export const getGenderReportFaliure = (error) => ({
	type: GET_GENDER_REPORT_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getGenderReport = (body, startLoading = () => { }, stopLoading = () => { }) => {
	return async (dispatch) => {
		startLoading()
		try {


			const response = await ApiGetNoAuth(`/urbanregister/getGenderReport?`, body);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getGenderReportSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			dispatch(getGenderReportFaliure(error));
		}
	};
};
