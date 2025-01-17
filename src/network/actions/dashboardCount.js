// actions/someActions.js

import toast from "react-hot-toast";
import {
	GET_FAMILY_LIST_SUCCESS,
	GET_FAMILY_LIST_FALIURE,
	GET_DASHBOARD_COUNT_SUCCESS,
	GET_DASHBOARD_COUNT_FALIURE,
} from "../action_types";
import { ApiGetNoAuth } from "../apiData";
// Action Creators
export const dashboardCountSuccess = (data) => ({
	type: GET_DASHBOARD_COUNT_SUCCESS,
	payload: data,
});

export const dashboardCountFaliure = (error) => ({
	type: GET_DASHBOARD_COUNT_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const dashboardCount = (body, startLoading = () => { }, stopLoading = () => { }) => {
	return async (dispatch) => {
		startLoading()
		try {
			const response = await ApiGetNoAuth(`/urbanregister/dashboardCount?`, body);

			dispatch(dashboardCountSuccess(response));
			stopLoading()
		} catch (error) {
			stopLoading()
			if (error?.response?.data?.message) {

				toast.error(error?.response?.data?.message)
			} else {

				toast.error(error?.message)
			}
			dispatch(dashboardCountFaliure(error));
		}
	};
};
