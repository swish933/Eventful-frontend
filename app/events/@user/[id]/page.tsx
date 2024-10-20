"use client";

import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
	CalendarCheck2,
	Link,
	MapPinIcon,
	Clock4,
	UserCircle,
} from "lucide-react";
import { differenceInHours, format } from "date-fns";
import { IPopulatedEvent } from "@/@types/types";
import { useEventById } from "@/lib/hooks/events";

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
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
						<Image src={src} alt={name} fill />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}

export default function Page({ params }: { params: { id: string } }) {
	const { data: event }: { data: IPopulatedEvent } = useEventById(params.id);
	console.log(event);

	return (
		<div>
			<ImageCarousel images={event?.images} name={event?.name} />

			<div className='my-10 max-w-4xl'>
				<div>
					<p>{format(event?.startsAt, "eeee, MMMM d")}</p>
					<p className='text-xl'>{event?.name}</p>

					{/* Event host  */}
					<div className=''>
						<div>
							{event?.organizer.avatar ? (
								<Image
									src={event.organizer.avatar}
									width={60}
									height={60}
									alt='Avatar'
									className='overflow-hidden rounded-full'
								/>
							) : (
								<UserCircle className='h-16 w-16 stroke-1' />
							)}
						</div>
						<p className=''>{event?.organizer.username}</p>
					</div>
					{/* mb */}

					<p className='text-lg font-semibold'>Date and time</p>
					<div className='flex space-x-2 items-center'>
						<CalendarCheck2 className='w-4 h-4' />
						<span>{}</span>
					</div>
					{/* mb */}

					<p className='text-lg font-semibold'>Location</p>
					<div className='flex space-x-2 items-center'>
						{event?.eventType === "physical" ? (
							<MapPinIcon className='w-4 h-4' />
						) : (
							<Link className='w-4 h-4' />
						)}
						<span>{event?.location}</span>
					</div>

					<p className='text-lg font-semibold'>About this event </p>
					<div className='flex space-x-2 items-center'>
						<Clock4 className='w-4 h-4' />
						<span>
							Event lasts {differenceInHours(event?.endsAt, event?.startsAt)}{" "}
							hours
						</span>
					</div>
					<p>{event?.description}</p>
				</div>
				<div className='hidden sticky bottom-full lg:top-0 lg:left-0 w-full lg:max-w-sm lg:flex flex-col border-border dark:border-border p-4'>
					<div className='flex justify-between'>
						<span>Admission</span>
						<span>+{1}-</span>
					</div>
					<p>{event?.price}</p>
				</div>
			</div>
		</div>
	);
}
