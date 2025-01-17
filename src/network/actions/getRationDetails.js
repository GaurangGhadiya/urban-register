// actions/someActions.js
import  { apiCall, survayAnalysis } from "../api";

import {
    GET_RATION_DETAILS_SUCCESS,
    GET_RATION_DETAILS_FALIURE,
} from "../action_types";
import { decryptData, encryptData } from "@/utils/encryptDecryot";
import { ApiGetNoAuth } from "../apiData";
import axios from "axios";
import toast from "react-hot-toast";
// Action Creators
export const getRationDetailsSuccess = (data) => ({
	type: GET_RATION_DETAILS_SUCCESS,
	payload: data,
});

export const getRationDetailsFaliure = (error) => ({
	type: GET_RATION_DETAILS_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getRationDetails = (value,startLoading,stopLoading) => {

	return async (dispatch) => {
		startLoading()
		try {
			const respinse  = await axios.get(`https://himparivarservices.hp.gov.in/urban-survey-api-v2/fetch-ration-details?rationCardNo=${value}`)
			dispatch(getRationDetailsSuccess(respinse?.data?.data));
			stopLoading()
		} catch (error) {
			dispatch(getRationDetailsFaliure(error?.response?.data?.message));
			toast.error(error?.response?.data?.message)
			stopLoading()
		}
	};
};
