import EventsGrid from "@/components/events-grid";

export default function Events() {
	return (
		<main className='flex flex-col'>
			<h1 className='text-2xl mb-10 font-bold'>Upcoming Events</h1>
			<EventsGrid />
		</main>
	);
}
