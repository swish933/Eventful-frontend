import { fetcher } from "../axios";
import useSWR from "swr";

export const useAnalytics = () => {
	const pathKey = `/api/v1/events/analytics`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || null, error, isLoading };
};

export const useAnalyticsById = (id: string) => {
	const pathKey = `api/v1/events/analytics/${id}`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || null, error, isLoading };
};
