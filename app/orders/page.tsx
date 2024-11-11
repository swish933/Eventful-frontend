"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useOrders } from "@/lib/hooks/orders";
import { IOrder } from "@/@types/types";
import {
	Clock4,
	CalendarCheck2,
	MapPinIcon,
	LinkIcon,
	TicketCheck,
	CreditCard,
	AlarmClockPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateReminderDialog from "@/components/create-reminder";
import Loading from "../loading";
import { currencyFormat } from "@/lib/utils";
import { PaginationWithLinks } from "@/components/pagination-with-links";
import { useSearchParams } from "next/navigation";

function OrderCard({ order }: { order: IOrder }) {
	return (
		<Card className='bg-background dark:bg-background border-border dark:border-border overflow-hidden max-w-3xl rounded-radius relative'>
			<Link key={order.id} href={`/orders/${order.id}`}>
				<CardContent className='grid grid-cols-1 sm:grid-cols-[1fr,_2fr] p-0 gap-x-4 gap-y-4 sm:gap-y-8'>
					<div className='relative w-1/2 mx-auto sm:mx-0 aspect-square sm:aspect-auto sm:w-full sm:h-auto'>
						<Image fill src={order.event.images[0]} alt={order.event.name} />
					</div>
					<div className='p-2	flex flex-col gap-y-2'>
						<p className='flex items-center space-x-2'>
							<CalendarCheck2 className=' text-primary w-4 h-4' />
							<span>{order.event.name}</span>
						</p>
						<p className='flex items-center space-x-2'>
							<Clock4 className='text-primary w-4 h-4' />
							<span>{format(order.event.startsAt, "eeee, d MMMM, yyyy")}</span>
							<span className='text-2xl'>&#183;</span>
							<span>{format(order.event.startsAt, "HH:mm")}</span>
						</p>{" "}
						<p className='flex items-center space-x-2'>
							{order.event.eventType === "physical" ? (
								<MapPinIcon className='text-primary w-4 h-4' />
							) : (
								<LinkIcon className='text-primary w-4 h-4' />
							)}

							<span>{order.event.location}</span>
						</p>
						<p className='flex items-center space-x-2'>
							<CreditCard className='text-primary w-4 h-4' />
							<span>Amount paid: {currencyFormat(order.amount)}</span>
						</p>
						<div className='flex justify-between items-center'>
							<p className='flex items-center space-x-2'>
								<TicketCheck className='text-primary w-4 h-4' />
								<span>Permits: {order.amount / order.event.price}</span>
							</p>
							<Badge className='uppercase bg-primary dark:bg-primary'>
								{order.status === "successful" ? "Paid" : "Pending"}
							</Badge>
						</div>
					</div>
				</CardContent>
			</Link>
			{order.event.startsAt > new Date().toISOString() && (
				<CreateReminderDialog event={order.event.id} />
			)}
		</Card>
	);
}

export default function Page() {
	const searchParams = useSearchParams();
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "10");

	const { data, isLoading } = useOrders(page, limit);
	const { orders, meta } = data;

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main className='flex flex-col space-y-8'>
			{orders?.map((order: IOrder) => (
				<OrderCard key={order.id} order={order} />
			))}

			<PaginationWithLinks
				page={meta?.page}
				pageSize={meta?.limit}
				totalCount={meta?.total}
				pageSizeSelectOptions={{
					pageSizeOptions: [1, 5, 10, 15, 20],
					pageSizeSearchParam: "limit",
				}}
				perPageDescriptor='Orders'
			/>
		</main>
	);
}
