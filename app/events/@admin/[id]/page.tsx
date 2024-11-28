"use client";

import { IAnalytics, IEvent } from "@/@types/types";
import Loading from "@/app/loading";
import AnalyticsCard from "@/components/analytics-card";
import withAuth from "@/components/withAuth";
import { useAnalyticsById } from "@/lib/hooks/analytics";
import { useEventById } from "@/lib/hooks/events";
import { currencyFormat } from "@/lib/utils";

type AnalyticsProps = {
	id: string;
	price: number;
};

function Analytics({ id, price }: AnalyticsProps) {
	const {
		data: analytics,
		isLoading,
	}: { data: IAnalytics; isLoading: boolean } = useAnalyticsById(id);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'>
			<AnalyticsCard
				description={`Total Tickets sold`}
				data={analytics?.tickets}
			/>
			<AnalyticsCard
				description={`Total Attendees`}
				data={analytics?.attendees}
			/>
			<AnalyticsCard
				description={`Total Sales`}
				data={currencyFormat(analytics?.tickets * price)}
			/>
			<AnalyticsCard
				description={`Scanned codes`}
				data={analytics?.scannedCodes}
			/>
		</div>
	);
}

function Page({ params }: { params: { id: string } }) {
	const { data: event, isLoading }: { data: IEvent; isLoading: boolean } =
		useEventById(params?.id);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main className='my-10 p-4 sm:px-6'>
			<Analytics id={params?.id} price={event?.price} />
			<section className='flex flex-col items-center my-10 gap-y-6 mx-auto max-w-lg'>
				<p className='text-3xl font-semibold'>{event?.name}</p>
				<p>{event?.description}</p>
				<p className='font-medium'>
					{new Intl.NumberFormat("en-NG", {
						style: "currency",
						currency: "NGN",
					}).format(event?.price)}
				</p>
			</section>
		</main>
	);
}

export default withAuth(Page);
