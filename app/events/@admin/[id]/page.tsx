"use client";

import { IAnalytics, IEvent } from "@/@types/types";
import Loading from "@/app/loading";
import AnalyticsCard from "@/components/analytics-card";
import { useAnalyticsById } from "@/lib/hooks/analytics";
import { useEventById } from "@/lib/hooks/events";

type AnalyticsProps = {
	id: string;
};

function Analytics({ id }: AnalyticsProps) {
	const {
		data: analytics,
		isLoading,
	}: { data: IAnalytics; isLoading: boolean } = useAnalyticsById(id);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='flex flex-wrap gap-8 justify-center items-center'>
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

export default function Page({ params }: { params: { id: string } }) {
	const { data: event, isLoading }: { data: IEvent; isLoading: boolean } =
		useEventById(params?.id);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main className='my-10'>
			<Analytics id={params?.id} />
			<section className='flex flex-col items-center my-10 gap-y-6 mx-auto max-w-lg'>
				<p className='text-3xl font-semibold'>{event?.name}</p>
				<p>{event?.description}</p>
				<p className='font-medium'>&#8358;{event?.price}</p>
			</section>
		</main>
	);
}
