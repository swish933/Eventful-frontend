"use client";

import React, {
	useContext,
	// useLayoutEffect
} from "react";
import { UserContext } from "@/context/UserContext";
import {
	// ApiResponse,
	// IUser,
	UserContextType,
} from "@/@types/types";
// import { axiosInstance } from "@/lib/axios";

function Layout({
	children,
	user,
	admin,
}: {
	children: React.ReactNode;
	user: React.ReactNode;
	admin: React.ReactNode;
}) {
	const { currentUser } = useContext(UserContext) as UserContextType;

	return <>{currentUser?.role === "organizer" ? admin : user}</>;
}

export default Layout;
