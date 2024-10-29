import { fetcher } from "../axios";
import useSWR from "swr";

export const useOrders = () => {
	const pathKey = `/api/v1/orders`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || [], error, isLoading };
};

export const useEventById = (id: string) => {
	const pathKey = `api/v1/orders/${id}`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || null, error, isLoading };
};
