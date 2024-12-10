"use client";

import EventsGrid from "@/components/events-grid";
import withAuth from "@/components/withAuth";

function Events() {
	return (
		<main className='flex flex-col'>
			<h1 className='text-2xl mb-10 font-bold'>Upcoming Events</h1>
			<EventsGrid />
		</main>
	);
}

export default withAuth(Events);
