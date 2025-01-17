// actions/someActions.js

import {
    GET_FAMILY_LIST_SUCCESS,
    GET_FAMILY_LIST_FALIURE,
    GET_VERIFICATION_COUNT_SUCCESS,
    GET_VERIFICATION_COUNT_FALIURE,
} from "../action_types";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getVerificationReportSuccess = (data) => ({
	type: GET_VERIFICATION_COUNT_SUCCESS,
	payload: data,
});

export const getVerificationReportFaliure = (error) => ({
	type: GET_VERIFICATION_COUNT_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getVerificationReport = (body,startLoading=() => {}, stopLoading=() => {}) => {
	return async (dispatch) => {
startLoading()
		try {
			let params = {}
            if(body?.district){
                params.district_id = typeof body?.district == "String" ? body?.district : body?.district?.toString()
            }
            if(body?.municipal){
                params.municipal_id = typeof body?.municipal == "String" ? body?.municipal : body?.municipal?.toString()
            }
            if(body?.ward){
                params.ward_id = typeof body?.ward == "String" ? body?.ward : body?.ward?.toString()
            }
            // if(body?.searchByParivar){
            //     params.searchByParivar = body?.searchByParivar
            // }
            // if(body?.page){
            //     params.page = JSON.stringify(body?.page)
            // }

			const response = await ApiGetNoAuth(`/urbanregister/getVerificationReport?page=${body?.page || 0}${Object.keys(params).length > 0 ? "&" : ""}`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getVerificationReportSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			dispatch(getVerificationReportFaliure(error));
		}
	};
};
