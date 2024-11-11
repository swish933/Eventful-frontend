import { fetcher } from "../axios";
import useSWR from "swr";

export const useOrders = (page: number, limit: number) => {
	const pathKey = `/api/v1/orders/?page=${page}&limit=${limit}`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || [], error, isLoading };
};

export const useOrderById = (id: string) => {
	const pathKey = `api/v1/orders/${id}`;
	const { data, error, isLoading } = useSWR(pathKey, fetcher);

	return { data: data?.payload || null, error, isLoading };
};
