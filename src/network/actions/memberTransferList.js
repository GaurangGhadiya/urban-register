// actions/someActions.js

import {
    GET_FAMILY_LIST_SUCCESS,
    GET_FAMILY_LIST_FALIURE,
    TRANSFER_MEMBER_LIST_SUCCESS,
    TRANSFER_MEMBER_LIST_FALIURE,
} from "../action_types";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const memberTransferListSuccess = (data) => ({
	type: TRANSFER_MEMBER_LIST_SUCCESS,
	payload: data,
});

export const memberTransferListFaliure = (error) => ({
	type: TRANSFER_MEMBER_LIST_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const memberTransferList = (body,startLoading = () => {}, stopLoading= () => {}) => {
	return async (dispatch) => {
        startLoading()
		try {
			let params = {}
            if(body?.district_id){
                params.district_id = body?.district_id?.toString()
            }
            if (body?.municipal_id){
                params.municipal_id = body?.municipal_id?.toString()
            }
            if(body?.ward_id){
                params.ward_id = body?.ward_id?.toString()
            }
            if(body?.ration_card_no){
                params.ration_card_no = body?.ration_card_no
            }
            if(body?.aadhaar_no){
                params.aadhaar_no = body?.aadhaar_no
            }

            if(body?.himparivar_no){
                params.himparivar_no = body?.himparivar_no
            }
            if(body?.searchByParivar){
                params.searchByParivar = body?.searchByParivar
            }
            if (body?.status) {
                params.transferStatus = body?.status
            }

            const response = await ApiGetNoAuth(`/urbanregister/memberTransferList?page=${body?.page || 0}${Object.keys(params).length > 0 ? "&" : ""}`, params);
			// const response = await apiCall.get(
			// 	`/master-data?status=${encryptData(`true`)}&parentId=${encryptData(body?.municipalId)}&masterName=${encryptData("ward")}`
			// );
			// let responseData = decryptData(response?.data?.data)
			dispatch(memberTransferListSuccess(response));
            stopLoading()
        } catch (error) {
            stopLoading()
			dispatch(memberTransferListFaliure(error));
		}
	};
};
