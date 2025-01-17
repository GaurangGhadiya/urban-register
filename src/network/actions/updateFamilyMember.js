// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
    GET_FAMILY_BY_ID_SUCCESS,
    GET_FAMILY_BY_ID_FALIURE,
    UPDATE_FAMILY_SUCCESS,
    UPDATE_FAMILY_FALIURE,
    UPDATE_FAMILY_MEMBER_SUCCESS,
    UPDATE_FAMILY_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth, ApiPostNoAuth } from "../apiData";
// Action Creators
export const updateFamilyMemberSuccess = (data) => ({
	type: UPDATE_FAMILY_MEMBER_SUCCESS,
	payload: data,
});

export const updateFamilyMemberFaliure = (error) => ({
	type: UPDATE_FAMILY_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const updateFamilyMember = (familyMemberId, body, extraAferHeadUpdate, index = 0) => {
	return async (dispatch) => {

		try {

			const response = await ApiPostNoAuth(`/urbanregister/updateFamilyMember?family_member_id=${encryptDataGet(familyMemberId)}`, body);
			toast.success(response?.message)


extraAferHeadUpdate(index)
			dispatch(updateFamilyMemberSuccess(response));
		} catch (error) {
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}			dispatch(updateFamilyMemberFaliure(error));
		}
	};
};
