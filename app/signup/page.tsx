"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import "../globals.css";

const formSchema = z
	.object({
		email: z.string().email(),
		username: z
			.string()
			.min(5, { message: "Must be 5 or more characters long" }),
		password: z
			.string()
			.min(6, { message: "Must be 6 or more characters long" }),
		confirm_password: z
			.string()
			.min(6, { message: "Must be 6 or more characters long" }),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ["confirm_password"],
	});

export default function RegisterForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirm_password: "",
		},
	});

	async function onSubmit(userCredentials: z.infer<typeof formSchema>) {
		console.log(userCredentials);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/user`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					mode: "cors",
					body: JSON.stringify(userCredentials),
				}
			);

			const data = await response.json();

			console.log(data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.error(error);
			}
		}
	}

	return (
		<main className='min-h-screen grid place-items-center bg-background text-foreground'>
			<Card className='mx-auto max-w-sm w-full bg-card dark:bg-card text-card-foreground border-border dark:border-border border-2'>
				<CardHeader>
					<CardTitle className='text-2xl'>Register</CardTitle>
					<CardDescription>Enter your email below to register.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
								name='confirm_password'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='confirm_password'>
											Confirm Password
										</FormLabel>
										<FormControl>
											<Input
												id='confirm_password'
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

							<Button
								disabled={form.formState.isSubmitting}
								type='submit'
								className='w-full bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/75 dark:hover:bg-primary/75 focus-visible:ring-ring dark:focus-visible:ring-ring'
							>
								Sign up
							</Button>
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
