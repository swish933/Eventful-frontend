"use client";

import EventsTable from "@/components/admin-events-table";
import withAuth from "@/components/withAuth";

function Events() {
	return <EventsTable />;
}

export default withAuth(Events);
