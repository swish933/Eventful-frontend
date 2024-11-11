"use client";

import Image from "next/image";
import { IEvent, UserContextType } from "@/@types/types";
import { useAllEvents } from "@/lib/hooks/events";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { Banknote, Calendar } from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { Suspense, useContext } from "react";
import Loading from "@/app/loading";
import { currencyFormat } from "@/lib/utils";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { useSearchParams } from "next/navigation";

function EventCard({ event }: { event: IEvent }) {
	const { currentUser } = useContext(UserContext) as UserContextType;

	const attending = currentUser?.events.includes(event.id);

	return (
		<Link key={event.id} href={`/events/${event.id}`}>
			<Card className='bg-background dark:bg-background border-border dark:border-border overflow-hidden'>
				<CardContent className='p-0 space-y-4 rounded-radius group'>
					<div className='relative w-full h-80'>
						<Image
							className='aspect-square object-cover transition-all duration-200 group-hover:scale-105'
							src={event.images[0]}
							alt={`${event.name}`}
							fill={true}
							priority={true}
						/>
					</div>
					<div className='pl-2 space-y-1 pb-4 '>
						<p className='font-semibold'>{event?.name}</p>
						<div className='flex text-sm font-semibold space-x'>
							<Calendar className='w-4 h-4' />
							<span className='ml-2'>
								{formatDistanceToNowStrict(event?.startsAt)} to go
							</span>
						</div>
						<div className='flex justify-between pr-2'>
							<div className='flex'>
								<Banknote className='w-4 h-4' />
								<span className='text-sm ml-2 font-semibold'>
									{currencyFormat(event?.price)}
								</span>
							</div>

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
	const searchParams = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "10");

	const { data, isLoading } = useAllEvents(page, limit);
	const { events, meta } = data;

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Suspense fallback={<Loading />}>
				<main>
					<h1 className='text-2xl mb-10 font-bold'>Upcoming Events</h1>
					<div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-4 gap-y-8'>
						{events?.length > 0 &&
							events?.map((event: IEvent) => (
								<EventCard key={event.id} event={event} />
							))}
					</div>

					<div className='my-4'>
						<PaginationWithLinks
							page={meta?.page}
							pageSize={meta?.limit}
							totalCount={meta?.total}
							perPageDescriptor='Events'
							pageSizeSelectOptions={{
								pageSizeOptions: [5, 10, 15, 20],
								pageSizeSearchParam: "limit",
							}}
						/>
					</div>
				</main>
			</Suspense>
		</>
	);
}
