"use client";

import Image from "next/image";
import { File, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import CreateEventDialogBtn from "@/components/create-event-dialog";
import { useEvents } from "@/lib/hooks/events";
import { IEvent, IAnalytics } from "@/@types/types";
import Loading from "@/app/loading";
import AnalyticsCard from "@/components/analytics-card";
import { useAnalytics } from "@/lib/hooks/analytics";
import { useRouter } from "next/navigation";
import { currencyFormat } from "@/lib/utils";

type Props = {
	username: string | undefined;
};

type AnalyticsProps = {
	events: number;
};

function AllTimeAnalytics({ events }: AnalyticsProps) {
	const {
		data: analytics,
		isLoading,
	}: { data: IAnalytics; isLoading: boolean } = useAnalytics();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'>
			<AnalyticsCard description={`Total Events`} data={events} />
			<AnalyticsCard
				description={`Total Tickets sold`}
				data={analytics.tickets}
			/>
			<AnalyticsCard
				description={`Total Attendees`}
				data={analytics.attendees}
			/>
			<AnalyticsCard
				description={`Scanned codes`}
				data={analytics.scannedCodes}
			/>
		</div>
	);
}

export default function EventsTable({ username }: Props) {
	const { data, isLoading } = useEvents();
	const { events, meta } = data;

	const router = useRouter();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
			<h2>
				Welcome, <span className='font-bold'>@{username}</span>
			</h2>

			<AllTimeAnalytics events={events.length} />

			<hr className='border' />

			<div className='flex items-center'>
				<div className='ml-auto flex items-center gap-2'>
					<Button
						size='sm'
						variant='outline'
						className='h-7 gap-1 bg-secondary border-border dark:border-border dark:bg-secondary hover:bg-secondary/50 dark:hover:bg-secondary/50 text-secondary-foreground dark:text-secondary-foreground ring-ring dark:ring-ring'
					>
						<File className='h-3.5 w-3.5' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
							Export
						</span>
					</Button>

					<CreateEventDialogBtn />
				</div>
			</div>

			<Card className='bg-card dark:bg-card text-foreground dark:text-foreground border-border dark:border-border'>
				<CardHeader>
					<CardTitle>Events</CardTitle>
					<CardDescription>
						Manage your events and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table className='bg'>
						<TableHeader>
							<TableRow>
								<TableHead className='hidden w-[100px] sm:table-cell'>
									<span className='sr-only'>Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Price</TableHead>
								<TableHead className='hidden md:table-cell'>
									Total Sales
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Created at
								</TableHead>
								<TableHead>
									<span className='sr-only'>Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{events.length > 0 &&
								events?.map((event: IEvent) => (
									<TableRow
										key={event?.id}
										className='cursor-pointer'
										onClick={() => router.push(`/events/${event?.id}`)}
									>
										<TableCell className='hidden sm:table-cell'>
											{event?.images?.length ? (
												<Image
													alt={`${event?.name} image`}
													className='aspect-square rounded-radius object-cover'
													height='64'
													src={event?.images[0]}
													width='64'
												/>
											) : (
												<Image
													alt={`${event?.name} image`}
													className='aspect-square rounded-radius object-cover'
													height='64'
													width='64'
													src='https://placehold.co/64x64/webp?font=raleway'
												/>
											)}
										</TableCell>

										<TableCell className='font-medium'>{event?.name}</TableCell>

										<TableCell>{currencyFormat(event?.price)}</TableCell>

										<TableCell className='hidden md:table-cell'>
											{event?.customers?.length}
										</TableCell>

										<TableCell className='hidden md:table-cell'>
											{format(event?.createdAt, "dd-MM-yyyy HH:mm")}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup='true'
														size='icon'
														variant='ghost'
													>
														<MoreHorizontal className='h-4 w-4' />
														<span className='sr-only'>Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className='text-xs text-muted-foreground'>
						Showing <strong>1-10</strong> of <strong>32</strong> products
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
