import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		accept: "application/json",
	},
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export const fetcher = (url: string) => {
	return axiosInstance.get(url).then((res) => {
		if (!res.data) {
			throw Error(res.data.message);
		}

		return res.data;
	});
};

export { axiosInstance };
