import { fetcher } from "../axios";
import useSWR from "swr";

export const useEvents = (page: number, limit: number) => {
	const pathKey = `/api/v1/events/myevents/?page=${page}&limit=${limit}`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || [], error, isLoading };
};

export const useAllEvents = (page: number, limit: number) => {
	const pathKey = `/api/v1/events/?page=${page}&limit=${limit}`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || [], error, isLoading };
};

export const useEventById = (id: string) => {
	const pathKey = `api/v1/events/${id}`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || null, error, isLoading };
};
