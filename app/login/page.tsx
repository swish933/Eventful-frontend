"use client";

import Link from "next/link";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export default function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(userCredentials: z.infer<typeof formSchema>) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
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
		<main className='min-h-screen grid place-items-center'>
			<Card className='mx-auto max-w-sm w-full bg-card dark:bg-card text-foreground dark:text-foreground border-border dark:border-border'>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
								className='w-full bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/75 dark:hover:bg-primary/75 focus-visible:ring-ring dark:focus-visible:ring-ring'
							>
								Login
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
	);
}
