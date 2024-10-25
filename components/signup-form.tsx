"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { PhoneInput } from "@/components/phone-input";
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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { grandstander } from "@/app/fonts";
import {
	ACCEPTED_IMAGE_TYPES,
	MAX_FILE_SIZE,
	TOAST_DURATION,
} from "@/lib/constants";
import { toast } from "sonner";

const formSchema = z
	.object({
		email: z.string().email(),
		username: z
			.string()
			.min(5, { message: "Must be 5 or more characters long" }),
		password: z
			.string()
			.min(6, { message: "Must be 6 or more characters long" }),
		confirmPassword: z
			.string()
			.min(6, { message: "Must be 6 or more characters long" }),
		phoneNumber: z
			.string()
			.refine(isValidPhoneNumber, { message: "Invalid phone number" }),
		role: z.enum(["attendee", "organizer"], {
			required_error: "You need to select a user type.",
		}),
		avatar: z
			.any()
			.refine(
				(file) =>
					file.length == 1
						? ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
							? true
							: false
						: false,
				".jpg, .jpeg, .png and .webp files are accepted."
			)
			.refine(
				(file) =>
					file.length == 1
						? file[0]?.size <= MAX_FILE_SIZE
							? true
							: false
						: false,
				`Max file size is 5MB.`
			)
			.optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export default function RegisterForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			phoneNumber: "",
			avatar: undefined,
			role: "attendee",
		},
	});

	const fileRef = form.register("avatar");

	async function onSubmit(userCredentials: z.infer<typeof formSchema>) {
		try {
			const formData = new FormData();
			const {
				email,
				username,
				password,
				confirmPassword,
				phoneNumber,
				avatar,
				role,
			} = userCredentials;

			formData.append("email", email);
			formData.append("username", username);
			formData.append("password", password);
			formData.append("confirmPassword", confirmPassword);
			formData.append("phoneNumber", phoneNumber);
			formData.append("role", role);
			if (avatar) {
				formData.append("avatar", avatar[0]);
			}

			await axiosInstance.post(`/api/v1/users`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			router.push("/login?from=registration");
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response) {
				console.log(error.response.data);
				toast.error(error.response.data.message, TOAST_DURATION);
			} else if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}

	return (
		<main className='min-h-screen grid place-items-center'>
			<div className='justify-self-end ml-4 fixed top-4 left-4'>
				<Link href='/' className='mr-6 flex' prefetch={false}>
					<p className={`text-3xl font-semibold ${grandstander.className}`}>
						Eventful
					</p>
				</Link>
			</div>
			<div className='justify-self-end mr-4 fixed top-4 right-4'>
				<ModeToggle />
			</div>
			<Card className='mx-auto max-w-md my-10 w-full bg-card dark:bg-card text-card-foreground border-border dark:border-border border-2'>
				<CardHeader>
					<CardTitle className='text-2xl'>Register</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='email'>Email</FormLabel>
											<FormControl>
												<Input
													id='email'
													type='email'
													placeholder='m@example.com'
													required
													autoComplete='email'
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
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='username'>Username</FormLabel>
											<FormControl>
												<Input
													id='username'
													placeholder='john_doe123'
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
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='password'>Password</FormLabel>
											<FormControl>
												<Input
													id='password'
													type='password'
													required
													autoComplete='current-password'
													className='bg-background dark:bg-background  border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='confirmPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='confirmPassword'>
												Confirm Password
											</FormLabel>
											<FormControl>
												<Input
													id='confirmPassword'
													type='password'
													required
													autoComplete='current-password'
													className='bg-background dark:bg-background  border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='phoneNumber'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='phoneNumber'>Phone number</FormLabel>
											<FormControl>
												<PhoneInput
													defaultCountry='NG'
													international
													id='phoneNumber'
													className='bg-background dark:bg-background  border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
													placeholder='Enter a phone number'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='avatar'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='avatar'>Avatar</FormLabel>
											<FormControl>
												<Input
													id='avatar'
													type='file'
													accept='image/*'
													className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
													{...fileRef}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='role'
								render={({ field }) => (
									<FormItem className='space-y-3 mt-4 mb-6'>
										<FormLabel htmlFor='rgroup'>User type</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className='flex space-x-1'
												id='rgroup'
											>
												<FormItem className='flex items-center space-x-3 space-y-0'>
													<FormControl>
														<RadioGroupItem
															id='attendeer1'
															value='attendee'
															className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring text-primary dark:text-primary'
														/>
													</FormControl>
													<FormLabel
														htmlFor='attendeer1'
														className='font-normal'
													>
														Attendee
													</FormLabel>
												</FormItem>
												<FormItem className='flex items-center space-x-3 space-y-0'>
													<FormControl>
														<RadioGroupItem
															id='organizerr2'
															value='organizer'
															className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring text-primary dark:text-primary'
														/>
													</FormControl>
													<FormLabel
														htmlFor='organizerr2'
														className='font-normal'
													>
														Organizer
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='mx-auto max-w-sm'>
								<Button
									disabled={form.formState.isSubmitting}
									type='submit'
									className='w-full bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/75 dark:hover:bg-primary/75 focus-visible:ring-ring dark:focus-visible:ring-ring'
								>
									Sign up
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<div className='grid gap-4 w-full'>
						<div className='mt-4 text-center text-sm'>
							Already have an account?{" "}
							<Link href='/login' className='underline hover:text-primary'>
								Login
							</Link>
						</div>
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
