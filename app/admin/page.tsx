"use client";

import EventsTable from "@/components/admin-events-table";
import withAuth from "@/components/withAuth";

function Admin() {
	return <EventsTable />;
}

export default withAuth(Admin);
