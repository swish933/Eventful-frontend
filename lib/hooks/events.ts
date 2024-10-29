import { fetcher } from "../axios";
import useSWR from "swr";

export const useEvents = () => {
  const pathKey = `/api/v1/events/myevents`;
  const { data, error, isLoading } = useSWR(pathKey, fetcher);

  return { data: data?.payload || [], error, isLoading };
};

export const useAllEvents = () => {
  const pathKey = `/api/v1/events/`;
  const { data, error, isLoading } = useSWR(pathKey, fetcher);

  return { data: data?.payload || [], error, isLoading };
};

export const useEventById = (id: string) => {
  const pathKey = `api/v1/events/${id}`;
  const { data, error, isLoading } = useSWR(pathKey, fetcher);

  return { data: data?.payload || null, error, isLoading };
};
