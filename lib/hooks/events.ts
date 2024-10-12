import { fetcher } from "../axios";
import useSWR from "swr";

export const useEvents = () => {
	const pathKey = `/api/v1/events/myevents`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || [], error, isLoading };
};
