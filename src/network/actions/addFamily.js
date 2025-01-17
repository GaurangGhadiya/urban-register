// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    ADD_FAMILY_SUCCESS,
    ADD_FAMILY_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiPostFormData, ApiPostNoAuth } from "../apiData";
import { addfamilymember } from "./addfamilymember";
// Action Creators
export const addFamilySuccess = (data) => ({
	type: ADD_FAMILY_SUCCESS,
	payload: data,
});

export const addFamilyFaliure = (error) => ({
	type: ADD_FAMILY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const addFamily = (body,extra,startLoading=()=>{}, stopLoading=()=>{},newBody,newExtra) => {
	return async (dispatch) => {
		startLoading()
		const formData = new FormData()
		formData.append('consentDocName', body?.dastavage)
		formData.append('CastDocument', body?.dastavage2)
		delete body.dastavage
		delete body.dastavage2
		formData.append('Family', encryptDataPost(JSON.stringify(body)))

		try {
			const response = await ApiPostFormData('/urbanregister/addfamily', formData)
			extra()
            // toast.success( response?.message)
			dispatch(addFamilySuccess(response));
			dispatch(addfamilymember({...newBody,  "familyId": response?.id,
				"himParivarId" : response?.HimParivarId,},newExtra, startLoading, stopLoading))
			stopLoading()
		} catch (error) {
			stopLoading()
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}
			dispatch(addFamilyFaliure(error));
		}
	};
};
