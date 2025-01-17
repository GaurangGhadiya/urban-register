// actions/someActions.js
import { apiCall, survayAnalysis } from "../api";
import { toast } from 'react-hot-toast';


import {
	GET_FAMILY_MEMBER_SUCCESS,
	GET_FAMILY_MEMBER_FALIURE,
} from "../action_types";
import { decryptData, encryptData, encryptDataGet, encryptDataPost } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const getfamilymemberSuccess = (data) => ({
	type: GET_FAMILY_MEMBER_SUCCESS,
	payload: data,
});

export const getfamilymemberFaliure = (error) => ({
	type: GET_FAMILY_MEMBER_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getfamilymember = (family_id, sentFullDetails = "0", startLoading = () => { }, stopLoading = () => { }) => {
	return async (dispatch) => {
		startLoading()
		try {
			let params = {
				family_id: typeof family_id == "number" ? JSON.stringify(family_id) : family_id,
				// sentFullDetails: typeof sentFullDetails == "number" ? JSON.stringify(sentFullDetails) : sentFullDetails
				sentFullDetails: "0"
			}
			const response = await ApiGetNoAuth(`/urbanregister/getfamilymember?`, params);

			dispatch(getfamilymemberSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			// toast.error(error?.message)
			dispatch(getfamilymemberFaliure(error));
		}
	};
};
