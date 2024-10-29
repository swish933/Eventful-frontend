"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarClock, CalendarPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	ACCEPTED_IMAGE_TYPES,
	MAX_MULTIFILES_SIZE,
	TOAST_DURATION,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AxiosError, AxiosResponse } from "axios";
import { TimePicker } from "@/components/time-picker";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRef } from "react";
import { useSWRConfig } from "swr";

const formSchema = z
	.object({
		name: z.string(),
		description: z
			.string()
			.max(300, { message: "Must be less than 300 characters" }),
		price: z.coerce.number().min(0, { message: "Price cannot be less than 0" }),
		location: z
			.string()
			.max(250, { message: "Must be less than 250 characters" }),
		startsAt: z.date().min(new Date(), {
			message: "The Start date/time cannot be earlier than now",
		}),
		endsAt: z.date(),
		reminderTime: z.date().min(new Date(), {
			message: "The Reminder date/time cannot be earlier than now",
		}),
		eventType: z.enum(["physical", "remote"], {
			required_error: "Please select an event type.",
		}),
		images: z
			.instanceof(globalThis.FileList)
			.transform((files) => Array.from(files))
			.refine(
				(images: File[]) =>
					images.length > 1
						? images.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
						: false,
				"Only .jpg, .jpeg, .png and .webp files are accepted"
			)
			.refine((images: File[]) => {
				if (images.length > 1) {
					let size = 0;
					images.forEach((image) => {
						size += image.size;
					});
					return size <= MAX_MULTIFILES_SIZE;
				} else {
					return false;
				}
			}, "Max size is 15MB."),
	})
	.refine((data) => data.endsAt > data.startsAt, {
		message:
			"The End date/time must be later than the scheduled Start date/time",
		path: ["endsAt"],
	})
	.refine((data) => data.reminderTime < data.startsAt, {
		message:
			"The Reminder has to be earlier than the scheduled Start date/time",
		path: ["reminderTime"],
	});

export default function CreateEventDialog() {
	const ref = useRef<HTMLButtonElement>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			location: "",
			startsAt: undefined,
			endsAt: undefined,
			reminderTime: undefined,
			eventType: "physical",
			images: undefined,
		},
	});
	const { mutate } = useSWRConfig();

	const fileRef = form.register("images", { required: true });

	async function onSubmit(eventDetails: z.infer<typeof formSchema>) {
		const formData = new FormData();
		try {
			const {
				name,
				description,
				location,
				price,
				startsAt,
				endsAt,
				reminderTime,
				eventType,
				images,
			} = eventDetails;

			images.forEach((file) => {
				formData.append("images", file);
			});

			formData.append("name", name);
			formData.append("description", description);
			formData.append("location", location);
			formData.append("price", price.toString());
			formData.append("startsAt", startsAt.toISOString());
			formData.append("endsAt", endsAt.toISOString());
			formData.append("reminderTime", reminderTime.toISOString());
			formData.append("eventType", eventType);

			const response: AxiosResponse = await axiosInstance.post(
				`/api/v1/events`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			ref.current?.click();
			toast.success(response.data.message, TOAST_DURATION);
			form.reset();

			mutate("/api/v1/events/myevents");
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response) {
				console.log(error.response.data);
				toast.error("Something went wrong. Please try again", TOAST_DURATION);
			} else if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}

	return (
		<Dialog>
			<DialogTrigger ref={ref} asChild>
				<Button
					size='sm'
					className='h-7 gap-1 bg-primary dark:bg-primary hover:bg-primary/50 dark:hover:bg-primary/50 text-primary-foreground dark:text-primary-foreground ring-ring dark:ring-ring'
				>
					<>
						<CalendarPlus className='h-3.5 w-3.5' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
							Create Event
						</span>
					</>
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] max-h-[90vh] overflow-y-scroll bg-card dark:bg-card text-card-foreground border-border dark:border-border border-2'>
				<DialogHeader>
					<DialogTitle>Create Event</DialogTitle>
					<DialogDescription>
						Create a new event here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='name'>Name</FormLabel>
									<FormControl>
										<Input
											id='name'
											type='text'
											placeholder='Event name'
											required
											className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='description'>Description</FormLabel>
									<FormControl>
										<Textarea
											id='description'
											required
											maxLength={300}
											placeholder='Description of event here'
											className='resize-none bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='eventType'
							render={({ field }) => (
								<FormItem className='space-y-3 mt-4 mb-6'>
									<FormLabel>Event type</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex space-x-1'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem
														value='physical'
														className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring text-primary dark:text-primary'
													/>
												</FormControl>
												<FormLabel className='font-normal'>Physical</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem
														aria-invalid
														value='remote'
														className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring text-primary dark:text-primary'
													/>
												</FormControl>
												<FormLabel className='font-normal'>Remote</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='location'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='location'>Location</FormLabel>
									<FormControl>
										<Textarea
											id='location'
											required
											maxLength={250}
											placeholder='Address or URL of event'
											className='resize-none bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='price'>
										Event price &#40;&#8358;&#41;
									</FormLabel>
									<FormControl>
										<Input
											id='price'
											type='number'
											step={500}
											required
											placeholder='20000'
											className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='images'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='images'>Images</FormLabel>
									<FormControl>
										<Input
											id='images'
											type='file'
											accept='image/*'
											required
											multiple
											className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
											{...fileRef}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='startsAt'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Start time</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring pl-3 text-left font-normal hover:bg-accent dark:hover:bg-accent",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP HH:mm:ss")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarClock className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className='pointer-events-auto w-auto p-0'
											align='start'
										>
											<Calendar
												className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
											<div className='p-3 border-t border-border'>
												<TimePicker
													setDate={field.onChange}
													date={field.value}
												/>
											</div>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='endsAt'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>End time</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring pl-3 text-left font-normal hover:bg-accent dark:hover:bg-accent",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP HH:mm:ss")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarClock className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className='pointer-events-auto w-auto p-0'
											align='start'
										>
											<Calendar
												className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
											<div className='p-3 border-t border-border'>
												<TimePicker
													setDate={field.onChange}
													date={field.value}
												/>
											</div>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='reminderTime'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Reminder time</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring pl-3 text-left font-normal hover:bg-accent dark:hover:bg-accent",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP HH:mm:ss")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarClock className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className='pointer-events-auto w-auto p-0'
											align='start'
										>
											<Calendar
												className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring'
												mode='single'
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
											<div className='p-3 border-t border-border'>
												<TimePicker
													setDate={field.onChange}
													date={field.value}
												/>
											</div>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={form.formState.isSubmitting}
							type='submit'
							className='bg-primary dark:bg-primary text-primary-foreground disabled:bg-primary/50 dark:text-primary-foreground hover:bg-primary/75 dark:hover:bg-primary/75 focus-visible:ring-ring dark:focus-visible:ring-ring capitalize'
						>
							Create event
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
