"use client";

import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function Admit({ params }: { params: { id: string } }) {
	useEffect(() => {
		async function admitUser() {
			try {
				const response = await axiosInstance.put(
					`/api/v1/events/qrcode/${params.id}`
				);

				toast.success(response.data.message);
			} catch (error: unknown) {
				if (error instanceof AxiosError && error.response) {
					toast.error(error.response.data.message, { duration: 2500 });
				} else if (error instanceof Error) {
					console.error(error.message);
				}
			}
		}

		admitUser();
	}, []);

	return (
		<div>
			<h3>User Access Page</h3>
		</div>
	);
}
