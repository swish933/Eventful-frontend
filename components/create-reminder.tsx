"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarClock, CalendarPlus, AlarmClockPlus } from "lucide-react";
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
import { TOAST_DURATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AxiosError, AxiosResponse } from "axios";
import { TimePicker } from "@/components/time-picker";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRef } from "react";

type ReminderProps = {
	event: string;
};

const formSchema = z.object({
	time: z.date().min(new Date(), {
		message: "The Reminder date/time cannot be earlier than now",
	}),
});

export default function CreateReminderDialog({ event }: ReminderProps) {
	const ref = useRef<HTMLButtonElement>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			time: undefined,
		},
	});

	async function onSubmit(reminder: z.infer<typeof formSchema>) {
		try {
			const { time } = reminder;

			const response: AxiosResponse = await axiosInstance.post(
				`/api/v1/reminders`,
				{ event, time }
			);

			ref.current?.click();
			toast.success(response.data.message, TOAST_DURATION);
			form.reset();
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response) {
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
					className='absolute top-2 right-2 h-7 gap-1 bg-primary dark:bg-primary hover:bg-primary/50 dark:hover:bg-primary/50 text-primary-foreground dark:text-primary-foreground ring-ring dark:ring-ring pointer-events-auto'
					onClick={(e) => e.stopPropagation()}
				>
					<>
						<AlarmClockPlus className='h-4 w-4' />
						{/* <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
							Add reminder
						</span> */}
					</>
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 sm:max-w-sm max-h-[60vh] top-52 overflow-y-scroll bg-card dark:bg-card text-card-foreground border-border dark:border-border border-2'>
				<DialogHeader>
					<DialogTitle>Create Reminder</DialogTitle>
					<DialogDescription>
						Create a reminder for your event.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='time'
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
											// align='start'
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
							Add reminder for event
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
