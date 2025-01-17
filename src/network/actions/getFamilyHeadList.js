// actions/someActions.js

import {

    GET_FAMILY_HEAD_LIST_SUCCESS,
    GET_FAMILY_HEAD_LIST_FALIURE,
} from "../action_types";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getFamilyHeadListSuccess = (data) => ({
	type: GET_FAMILY_HEAD_LIST_SUCCESS,
	payload: data,
});

export const getFamilyHeadListFaliure = (error) => ({
	type: GET_FAMILY_HEAD_LIST_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getFamilyHeadList = (body,startLoading=()=> {}, stopLoading=()=> {}) => {
	return async (dispatch) => {
startLoading()
		try {
			let params = {}
            if(body?.district){
                params.district_id = body?.district
            }
            if(body?.municipal){
                params.municipal_id = body?.municipal
            }
            if(body?.ward){
                params.ward_id = body?.ward
            }
            // if(body?.page){
            //     params.page = JSON.stringify(body?.page)
            // }

			const response = await ApiGetNoAuth(`/urbanregister/getFamilyHeadList${Object.keys(params).length > 0 ? "?" : ""}`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getFamilyHeadListSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			dispatch(getFamilyHeadListFaliure(error));
		}
	};
};
