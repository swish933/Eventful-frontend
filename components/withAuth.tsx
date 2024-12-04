"use client";

import { isAuthenticated } from "@/lib/auth";
import { useContext, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { ApiResponse, IUser, UserContextType } from "@/@types/types";
import { UserContext } from "@/context/UserContext";

export default function withAuth(Component: any) {
	return function IsAuth(props: any) {
		const router = useRouter();
		const { updateUser } = useContext(UserContext) as UserContextType;
		const fetchUser = async () => {
			const userResponse = await axiosInstance.get(`/api/v1/users`);
			let userDetails: ApiResponse<IUser> = userResponse.data;
			updateUser(userDetails.payload);
		};
		useLayoutEffect(() => {
			const isAuth = isAuthenticated();
			fetchUser();
			if (!isAuth) {
				router.replace("/login");
			}
		}, [router]);
		return <Component {...props} />;
	};
}
