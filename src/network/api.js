// utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Set your API base URL

	// headers: {
	// 	"Content-Type": "text/json", // Set the appropriate content type for your data
	// },
});

axiosInstance.interceptors.request.use((config) => {
	return config;
});

export default axiosInstance;



export const survayAnalysis = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SURVAY_ANALYSIS, // Set your API base URL

	// headers: {
	// 	"Content-Type": "text/json", // Set the appropriate content type for your data
	// },
});

survayAnalysis.interceptors.request.use((config) => {
	return config;
});



export const apiCall = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set your API base URL

	headers: {
		"Content-Type": "text/plain", // Set the appropriate content type for your data
	},
});

apiCall.interceptors.request.use((config) => {
	return config;
});


