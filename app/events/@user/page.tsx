"use client";

import Image from "next/image";
import { IEvent } from "@/@types/types";
import { useAllEvents } from "@/lib/hooks/events";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { Calendar } from "lucide-react";

function EventCard({ event }: { event: IEvent }) {
	return (
		<Link key={event.id} href={`/events/${event.id}`}>
			<Card className='bg-background dark:bg-background border-border dark:border-border overflow-hidden'>
				<CardContent className='p-0 space-y-4 rounded-radius'>
					<Image
						className='aspect-square object-cover'
						src={event.images[0]}
						alt={`${event.name}`}
						height={160}
						width={320}
					/>
					<div className='pl-2 space-y-1 pb-4'>
						<p className='font-medium'>{event.name}</p>
						<div className='flex text-sm font-semibold space-x'>
							<Calendar className='w-4 h-4' />
							<span className='ml-2'>
								{formatDistanceToNowStrict(event.startsAt)}
							</span>
						</div>

						<p className='text-sm'>&#8358;{event.price}</p>
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
			<main>
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
