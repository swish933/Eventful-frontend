"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
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
import { IEvent, IAnalytics, UserContextType } from "@/@types/types";
import Loading from "@/app/loading";
import AnalyticsCard from "@/components/analytics-card";
import { useAnalytics } from "@/lib/hooks/analytics";
import { useRouter, useSearchParams } from "next/navigation";
import { currencyFormat } from "@/lib/utils";
import { PaginationWithLinks } from "./pagination-with-links";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

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
				data={analytics?.tickets}
			/>
			<AnalyticsCard
				description={`Total Attendees`}
				data={analytics?.attendees}
			/>
			<AnalyticsCard
				description={`Scanned codes`}
				data={analytics?.scannedCodes}
			/>
		</div>
	);
}

export default function EventsTable() {
	const searchParams = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "10");

	const { currentUser } = useContext(UserContext) as UserContextType;
	const { data, isLoading } = useEvents(page, limit);
	const { events, meta } = data;

	// console.log(events);

	const router = useRouter();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
			<h2>
				Welcome, <span className='font-bold'>@{currentUser?.username}</span>
			</h2>

			<AllTimeAnalytics events={meta?.total} />

			<hr className='border' />

			<div className='flex items-center'>
				<div className='ml-auto flex items-center gap-2'>
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
									Tickets sold
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
							{events &&
								events?.map((event: IEvent) => (
									<TableRow
										key={event?.id}
										className='cursor-pointer hover:bg-accent dark:hover:bg-accent'
										onClick={() => router.push(`/admin/${event?.id}`)}
									>
										<TableCell className='hidden sm:table-cell'>
											{event?.images?.length > 0 ? (
												<Image
													alt={event && `${event?.name} image`}
													className='aspect-square rounded-radius object-cover'
													height='64'
													src={event && event?.images[0]}
													width='64'
												/>
											) : (
												<Image
													alt={event && `${event?.name} image`}
													className='aspect-square rounded-radius object-cover'
													height='64'
													width='64'
													src='/placeholder.jpg'
												/>
											)}
										</TableCell>

										<TableCell className='font-medium'>
											{event && event?.name}
										</TableCell>

										<TableCell>{currencyFormat(event?.price)}</TableCell>

										<TableCell className='hidden md:table-cell'>
											{event?.ticketsSold}
										</TableCell>

										<TableCell className='hidden md:table-cell'>
											{event && format(event?.createdAt, "dd-MM-yyyy HH:mm")}
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
				<CardFooter className='flex justify-between items-center'>
					{events && (
						<div className='text-xs text-muted-foreground'>
							Showing{" "}
							<strong>
								{meta?.limit * meta?.page - meta?.limit + 1}-
								{meta?.total < meta?.limit * meta?.page
									? meta?.total
									: meta?.limit * meta?.page}
							</strong>{" "}
							of <strong>{meta?.total}</strong> events
						</div>
					)}
					{events && (
						<PaginationWithLinks
							page={meta?.page}
							pageSize={meta?.limit}
							totalCount={meta?.total}
							pageSizeSelectOptions={{
								pageSizeOptions: [5, 10, 20, 30, 50],
								pageSizeSearchParam: "limit",
							}}
						/>
					)}
				</CardFooter>
			</Card>
		</main>
	);
}
