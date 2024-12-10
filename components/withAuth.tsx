"use client";

import { checkRole, isAuthenticated } from "@/lib/auth";
import { useContext, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { ApiResponse, IUser, UserContextType } from "@/@types/types";
import { UserContext } from "@/context/UserContext";

export default function withAuth(Component: any) {
	return function IsAuth(props: any) {
		const router = useRouter();
		const pathname = usePathname();
		const { updateUser, currentUser } = useContext(
			UserContext
		) as UserContextType;

		const fetchUser = async () => {
			const userResponse = await axiosInstance.get(`/api/v1/users`);
			let userDetails: ApiResponse<IUser> = userResponse.data;
			updateUser(userDetails.payload);
		};

		useLayoutEffect(() => {
			fetchUser();
			const isAuth = isAuthenticated();
			const userRole = checkRole();
			if (!isAuth) {
				router.replace("/login");
			}

			if (userRole !== "organizer" && pathname.startsWith("/admin")) {
				router.replace("/events");
			}

			if (
				userRole === "organizer" &&
				(pathname.startsWith("/events") || pathname.startsWith("/orders"))
			) {
				router.replace("/admin");
			}
		}, [router]);
		return <Component {...props} />;
	};
}
