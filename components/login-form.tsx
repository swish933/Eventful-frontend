"use client";

import Link from "next/link";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { axiosInstance } from "@/lib/axios";
import { grandstander } from "@/app/fonts";
import { AuthContext } from "@/context/AuthContext";
import {
	AuthContextType,
	ApiResponse,
	IUser,
	UserContextType,
} from "@/@types/types";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Spinner from "@/components/spinner";
import { UserContext } from "@/context/UserContext";

const formSchema = z.object({
	user: z.string(),
	password: z.string(),
});

export default function LoginForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const searchParams = useSearchParams();
	const { updateToken } = useContext(AuthContext) as AuthContextType;
	const { updateUser, currentUser } = useContext(
		UserContext
	) as UserContextType;

	useEffect(() => {
		const from = searchParams.get("from");
		if (from) {
			toast.success("Registration successful!", { duration: 2500 });
		}
	}, [searchParams]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			user: "",
			password: "",
		},
	});

	async function onSubmit(userCredentials: z.infer<typeof formSchema>) {
		try {
			setLoading(!loading);
			const data = JSON.stringify(userCredentials);

			const tokenResponse = await axiosInstance.post(
				"/api/v1/auth/login",
				data
			);
			const { token } = tokenResponse.data;
			updateToken(token);

			const userResponse = await axiosInstance.get(`/api/v1/users`);
			let userDetails: ApiResponse<IUser> = userResponse.data;
			updateUser(userDetails.payload);

			let route = userDetails.payload.role === "organizer" ? "admin" : "events";

			setLoading(false);

			if (searchParams.get("from")) {
				router.replace(route);
			} else {
				router.push(route);
			}
		} catch (error: unknown) {
			setLoading(false);
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.message, { duration: 2500 });
			} else if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}

	return (
		<Suspense fallback={<Loading />}>
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

				<Card className='mx-auto max-w-sm w-full bg-card dark:bg-card text-foreground dark:text-foreground border-border dark:border-border'>
					<CardHeader>
						<CardTitle className='text-2xl'>Login</CardTitle>
						<CardDescription>
							Enter your username or email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-6'
							>
								<FormField
									control={form.control}
									name='user'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='user'>Email or Username</FormLabel>
											<FormControl>
												<Input
													id='user'
													type='text'
													placeholder='Username/email'
													autoComplete='username'
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
													className='bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									disabled={form.formState.isSubmitting}
									type='submit'
									className='w-full bg-primary dark:bg-primary text-primary-foreground disabled:bg-primary/30 dark:text-primary-foreground hover:bg-primary/75 dark:hover:bg-primary/75 focus-visible:ring-ring dark:focus-visible:ring-ring '
								>
									{loading ? <Spinner /> : "Login"}
								</Button>
							</form>
						</Form>

						<div className='mt-4 text-center text-sm'>
							Don&apos;t have an account?{" "}
							<Link href='/signup' className='underline hover:text-primary'>
								Sign up
							</Link>
						</div>
					</CardContent>
				</Card>
			</main>
		</Suspense>
	);
}
