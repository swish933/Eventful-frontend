"use client";

import React, {
	useContext,
} from "react";
import { UserContext } from "@/context/UserContext";
import {
	UserContextType,
} from "@/@types/types";

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
