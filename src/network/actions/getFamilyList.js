// actions/someActions.js

import toast from "react-hot-toast";
import {
    GET_FAMILY_LIST_SUCCESS,
    GET_FAMILY_LIST_FALIURE,
} from "../action_types";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getFamilyListSuccess = (data) => ({
	type: GET_FAMILY_LIST_SUCCESS,
	payload: data,
});

export const getFamilyListFaliure = (error) => ({
	type: GET_FAMILY_LIST_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getFamilyList = (body,startLoading=() => {}, stopLoading=() => {}) => {
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
            if(body?.searchByParivar){
                params.searchByParivar = body?.searchByParivar
            }
            if(body?.status){
				params.searchByStatus = body?.status
            }
            // if(body?.page){
            //     params.page = JSON.stringify(body?.page)
            // }

			const response = await ApiGetNoAuth(`/urbanregister/getFamilyList?page=${body?.page || 0}${Object.keys(params).length > 0 ? "&" : ""}`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(getFamilyListSuccess(response));
			if (response?.content?.length == 0) {
				// toast.error("No family found", {
				// 	id: "/urbanregister/getFamilyList",
				// })
			}
			stopLoading()
		} catch (error) {
			stopLoading()
			dispatch(getFamilyListFaliure(error));
		}
	};
};
