"use client";

import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { IEvent, UserContextType } from "@/@types/types";
import { useAllEvents } from "@/lib/hooks/events";
import { Card, CardContent } from "@/components/ui/card";
import AppHeader from "@/components/app-header";
import Link from "next/link";

function EventCard({ event }: { event: IEvent }) {
	return (
		<Link key={event.id} href={`/events/${event.id}`}>
			<Card className='bg-background dark:bg-background border-border overflow-hidden'>
				<CardContent className='p-0 space-y-4 rounded-radius'>
					<Image
						className='aspect-square object-cover'
						src={event.images[0]}
						alt={`${event.name}`}
						height={160}
						width={320}
					/>
					<div className='pl-2'>
						<p className='font-medium'>{event.name}</p>
						<p className='font-normal'>&#8358;{event.price}</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

export default function Events() {
	const { data: events } = useAllEvents();

	return (
		<>
			<AppHeader />

			<main className='my-10 mx-auto max-w-6xl px-4 md:px-0'>
				<h1 className='text-2xl mb-10 font-bold'>Upcoming Events</h1>
				<div className='grid place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{events?.map((event: IEvent) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</main>
		</>
	);
}
