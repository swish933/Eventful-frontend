"use client";

import { IOrderById } from "@/@types/types";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { useOrderById } from "@/lib/hooks/orders";
import Image from "next/image";

type Props = {};

export default function Page({ params }: { params: { id: string } }) {
	const { data: order, isLoading }: { data: IOrderById; isLoading: boolean } =
		useOrderById(params.id);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='flex flex-col items-center space-y-4'>
			<div className='relative w-64 aspect-square'>
				<Image
					src={order.qrCode}
					alt={`${order.event.name} access QR code`}
					fill
				/>
			</div>
			<p className='font-medium'>{order.event.name}</p>
			<p>&#8358;{order.amount}</p>
			<p>{order.customer.email}</p>
			<Badge className='uppercase bg-primary dark:bg-primary'>
				{order.status === "successful" ? "Paid" : "Pending"}
			</Badge>{" "}
		</div>
	);
}
