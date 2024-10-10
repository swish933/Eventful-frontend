"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { UserContextType } from "@/@types/types";

export default function Events() {
	const { currentUser } = useContext(UserContext) as UserContextType;

	return (
		<main>
			<h2>Welcome @{currentUser?.username}</h2>
		</main>
	);
}
