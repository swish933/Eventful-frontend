"use client";

import Image from "next/image";
import { IEvent, UserContextType } from "@/@types/types";
import { useAllEvents } from "@/lib/hooks/events";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { Calendar } from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

function EventCard({ event }: { event: IEvent }) {
	const { currentUser } = useContext(UserContext) as UserContextType;

	const attending = currentUser?.events.includes(event.id);

	return (
		<Link key={event.id} href={`/events/${event.id}`}>
			<Card className='bg-background dark:bg-background border-border dark:border-border overflow-hidden'>
				<CardContent className='p-0 space-y-4 rounded-radius'>
					<div className='relative w-full h-80'>
						<Image
							className='aspect-square object-cover'
							src={event.images[0]}
							alt={`${event.name}`}
							fill={true}
							priority={true}
						/>
					</div>
					<div className='pl-2 space-y-1 pb-4 '>
						<p className='font-medium'>{event.name}</p>
						<div className='flex text-sm font-semibold space-x'>
							<Calendar className='w-4 h-4' />
							<span className='ml-2'>
								{formatDistanceToNowStrict(event.startsAt)} to go
							</span>
						</div>
						<div className='flex justify-between pr-2'>
							<p className='text-sm'>&#8358;{event.price}</p>
							{attending && (
								<Badge className='bg-primary text-primary-foreground dark:bg-primary dark:first:text-primary-foreground'>
									Attending
								</Badge>
							)}
						</div>
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
				<div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
					{events?.map((event: IEvent) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</main>
		</>
	);
}
