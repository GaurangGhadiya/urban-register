// actions/someActions.js
import axiosInstance from "../api";

import {
	VERIFY_SUCCESS,
	VERIFY_FALIURE,
} from "../action_types";
import removeQueryParam from "@/utils/removeQueryParam";
import { setCookiesValues } from "@/utils/cookies";
// Action Creators
export const tokenVerifySuccess = (data) => ({
	type: VERIFY_SUCCESS,
	payload: data,
});

export const tokenVerifyFaliure = (error) => ({
	type: VERIFY_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const verifyToken = (body,router) => {
	return async (dispatch) => {

		try {
			const response = await axiosInstance.post(
				`/validate-token`,
				body
			);
			router.push("/registration")
			dispatch(tokenVerifySuccess(response.data));
			setCookiesValues("userData", response?.data)
			removeQueryParam("token",router)
		} catch (error) {
			dispatch(tokenVerifyFaliure(error));
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}

		}
	};
};
