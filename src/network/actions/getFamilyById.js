// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    GET_FAMILY_BY_ID_SUCCESS,
    GET_FAMILY_BY_ID_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getFamilyByIdSuccess = (data) => ({
	type: GET_FAMILY_BY_ID_SUCCESS,
	payload: data,
});

export const getFamilyByIdFaliure = (error) => ({
	type: GET_FAMILY_BY_ID_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getFamilyById = (family_id,startLoading=() => {}, stopLoading = () => {}) => {
	return async (dispatch) => {
		startLoading()

		try {
			let params = {
				family_id : JSON.stringify(family_id),
			}
			const response = await ApiGetNoAuth(`/urbanregister/getFamilyById?`, params);
// 			const response = await apiCall.get(
// 				`/urbanregister/getFamilyById?family_id=${encryptDataGet(JSON.stringify(family_id))}`
// 			);

// 			let responseData = decryptData(response?.data?.data)
			dispatch(getFamilyByIdSuccess(response));
			stopLoading()
		} catch (error) {
            toast.error(error?.message)
			dispatch(getFamilyByIdFaliure(error));
			stopLoading()
		}
	};
};
