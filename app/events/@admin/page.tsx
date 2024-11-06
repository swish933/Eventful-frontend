"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { UserContextType } from "@/@types/types";
import EventsTable from "@/components/admin-events-table";

export default function Events() {
	const { currentUser } = useContext(UserContext) as UserContextType;
	return <EventsTable username={currentUser?.username} />;
}
