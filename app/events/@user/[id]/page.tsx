"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Dispatch, useRef, useState } from "react";
import {
	CalendarCheck2,
	Clock4,
	Link,
	MapPinIcon,
	UserCircle,
} from "lucide-react";
import { differenceInHours, format } from "date-fns";
import { IPopulatedEvent } from "@/@types/types";
import { useEventById } from "@/lib/hooks/events";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import paystackLogo from "@/public/paystack logo.svg";
import { TOAST_DURATION } from "@/lib/constants";

type CarouselProps = { images: string[]; name: string };
function ImageCarousel({ images, name }: CarouselProps) {
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

	return (
		<Carousel
			plugins={[plugin.current]}
			opts={{
				align: "center",
				loop: true,
			}}
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
			className='mx-auto w-full max-w-4xl'
		>
			<CarouselContent>
				{images?.map((src, index) => (
					<CarouselItem key={index} className=' h-80 md:h-[30rem] relative'>
						<Image
							src={src}
							alt={name}
							className='object-contain'
							fill
							priority={true}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}

type PaymentBoxProps = {
	id: string;
	price: number;
	className?: string;
	ticketCount: number;
	setTicketCount: Dispatch<number>;
};
function PaymentBox({
	id,
	price,
	setTicketCount,
	ticketCount,
	className,
}: PaymentBoxProps) {
	const router = useRouter();

	function modifyTicketCount(action = "add") {
		switch (action) {
			case "add":
				setTicketCount(ticketCount + 1);
				break;

			case "sub":
				if (ticketCount) {
					setTicketCount(ticketCount - 1);
				}
				break;

			default:
				return;
		}
	}

	async function initiateTransaction() {
		let transactionInfo = {
			eventId: id,
			tickets: ticketCount,
		};

		try {
			let data = JSON.stringify(transactionInfo);

			const response = await axiosInstance.post(
				`/api/v1/orders/initiate_transaction`,
				data
			);

			//Navigate to authorization_url to complete payment with paystack
			router.push(response.data.payload.data.authorization_url);
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				console.log(error.response.data);
				toast.error("Something went wrong. Please try again", TOAST_DURATION);
			} else if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}

	return (
		<div
			className={`sticky w-full flex flex-col border-2 rounded-radius border-border dark:border-border p-4 space-y-5 ${className}`}
		>
			<div className='flex justify-between items-center '>
				<span className='font-medium'>Admission</span>
				<div className='flex items-center'>
					<Button
						className='text-lg bg-red-500 dark:bg-red-500 text-primary-foreground dark:text-primary-foreground hover:bg-red-200 dark:hover:bg-red-300'
						onClick={() => modifyTicketCount("sub")}
					>
						-
					</Button>
					<span className='mx-4'>{ticketCount}</span>
					<Button
						className='text-lg bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/60 dark:hover:bg-primary/60'
						onClick={() => modifyTicketCount("add")}
					>
						+
					</Button>
				</div>
			</div>
			<p className='font-medium'>
				&#8358;{price} <span className='text-sm font-normal'>(per ticket)</span>
			</p>
			<Button
				onClick={() => initiateTransaction()}
				className='bg-primary dark:bg-primary text-white'
			>
				Pay with{" "}
				<span className='ml-2'>
					<Image src={paystackLogo} alt='paystack'></Image>
				</span>
			</Button>
		</div>
	);
}

export default function Page({ params }: { params: { id: string } }) {
	const {
		data: event,
		isLoading,
	}: { data: IPopulatedEvent; isLoading: boolean } = useEventById(params.id);

	const [ticketCount, setTicketCount] = useState<number>(0);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<ImageCarousel images={event?.images} name={event?.name} />

			<section className='my-10 w-full lg:pl-8 lg:grid gap-28 grid-cols-[2fr_1fr] '>
				<div className='space-y-8'>
					<p>{format(event?.startsAt, "eeee, MMMM d")}</p>
					<p className='text-5xl font-semibold'>{event?.name}</p>
					<p>{event?.description}</p>

					{/* Event host  */}
					<div className='flex items-center space-x-3 p-4 bg-gray-200 dark:bg-slate-600 rounded-radius'>
						<>
							{event?.organizer.avatar ? (
								<Image
									src={event.organizer.avatar}
									width={48}
									height={48}
									alt='Avatar'
									className='overflow-hidden rounded-full'
								/>
							) : (
								<UserCircle className='h-12 w-12 stroke-1' />
							)}
						</>
						<div>
							<span className='text-muted-foreground dark:text-muted-foreground'>
								By
							</span>
							{"  "}
							<span className='capitalize font-semibold'>
								{event?.organizer.username}
							</span>
						</div>
					</div>

					<section className='space-y-2'>
						<p className='text-xl font-semibold'>Date and time</p>
						<div className='flex space-x-2 items-center'>
							<CalendarCheck2 className='text-primary w-4 h-4' />
							<span>{format(event?.startsAt, "eeee, MMMM d")}</span>
						</div>
					</section>

					<section className='space-y-2'>
						<p className='text-xl font-semibold'>Location</p>
						<div className='flex space-x-2 items-center'>
							{event?.eventType === "physical" ? (
								<MapPinIcon className='text-primary w-4 h-4' />
							) : (
								<Link className='text-primary w-4 h-4' />
							)}
							<span>{event?.location}</span>
						</div>
					</section>

					<section className='space-y-2'>
						<p className='text-xl font-semibold'>About this event</p>
						<div className='flex space-x-2 items-center'>
							<Clock4 className=' text-primary w-4 h-4' />
							<span>
								Event lasts {differenceInHours(event?.endsAt, event?.startsAt)}{" "}
								hours
							</span>
						</div>
					</section>
				</div>
				<PaymentBox
					setTicketCount={setTicketCount}
					ticketCount={ticketCount}
					price={event?.price}
					id={params.id}
					className='hidden self-start lg:flex lg:top-28 lg:left-0'
				/>
				<PaymentBox
					setTicketCount={setTicketCount}
					ticketCount={ticketCount}
					price={event?.price}
					id={params.id}
					className='lg:hidden bottom-0 bg-background dark:bg-background'
				/>
			</section>
		</div>
	);
}
