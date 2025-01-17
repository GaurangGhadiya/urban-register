// actions/someActions.js
import axiosInstance, { survayAnalysis } from "../api";

import {
    SURVAY_ANALYSIS_SUCCESS,
    SURVAY_ANALYSIS_FALIURE,
} from "../action_types";
// Action Creators
export const survayAnalysisSuccess = (data) => ({
	type: SURVAY_ANALYSIS_SUCCESS,
	payload: data,
});

export const survayAnalysisFaliure = (error) => ({
	type: SURVAY_ANALYSIS_FALIURE,
	payload: error,
});


// Async Action to Fetch Data
export const getSurvayAnalysis = (body,router) => {
	return async (dispatch) => {

		try {
			const response = await survayAnalysis.get(
				`/urban-survey-dashboard/report/survey`
			);
			dispatch(survayAnalysisSuccess(response.data));
		} catch (error) {
			dispatch(survayAnalysisFaliure(error));
		}
	};
};
