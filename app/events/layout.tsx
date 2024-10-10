"use client";

import { useLayoutEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { AuthContext } from "@/context/AuthContext";
import {
	IUser,
	UserContextType,
	AuthContextType,
	ApiResponse,
} from "@/@types/types";
import { useRouter } from "next/navigation";

export default function Layout({
	user,
	admin,
}: {
	user: React.ReactNode;
	admin: React.ReactNode;
}) {
	const router = useRouter();
	const { currentUser, updateUser } = useContext(
		UserContext
	) as UserContextType;

	const { token } = useContext(AuthContext) as AuthContextType;

	useLayoutEffect(() => {
		if (!token) {
			router.replace("/login");
		}
	}, [token, router]);

	useLayoutEffect(() => {
		async function fetchUser() {
			let response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
				{
					headers: {
						Authorization: localStorage.getItem("token")
							? `Bearer ${localStorage.getItem("token")}`
							: ``,
					},
				}
			);
			if (!response.ok) {
				console.log(response.status);
			}
			let userDetails: ApiResponse<IUser> = await response.json();

			updateUser(userDetails.payload);
		}

		fetchUser();
	}, []);

	return <>{currentUser?.role === "organizer" ? admin : user}</>;
}
