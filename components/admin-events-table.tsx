import Image from "next/image";
import { File, MoreHorizontal } from "lucide-react";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import CreateEventDialogBtn from "@/components/create-event-dialog";

type Props = {
	username: string | undefined;
};

export default function EventsTable({ username }: Props) {
	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
			<h2>Welcome, @{username}</h2>
			<div className='flex items-center'>
				<div className='ml-auto flex items-center gap-2'>
					<Button
						size='sm'
						variant='outline'
						className='h-7 gap-1 bg-secondary border-border dark:border-border dark:bg-secondary hover:bg-secondary/50 dark:hover:bg-secondary/50 text-secondary-foreground dark:text-secondary-foreground'
					>
						<File className='h-3.5 w-3.5' />
						<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
							Export
						</span>
					</Button>

					<CreateEventDialogBtn />
				</div>
			</div>

			<Card className='bg-card dark:bg-card text-foreground dark:text-foreground border-border dark:border-border'>
				<CardHeader>
					<CardTitle>Recent Events</CardTitle>
					<CardDescription>
						Manage your events and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table className='bg'>
						<TableHeader>
							<TableRow>
								<TableHead className='hidden w-[100px] sm:table-cell'>
									<span className='sr-only'>Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Price</TableHead>
								<TableHead className='hidden md:table-cell'>
									Total Sales
								</TableHead>
								<TableHead className='hidden md:table-cell'>
									Created at
								</TableHead>
								<TableHead>
									<span className='sr-only'>Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className='hidden sm:table-cell'>
									<Image
										alt='Product image'
										className='aspect-square rounded-md object-cover'
										height='64'
										src='/placeholder.svg'
										width='64'
									/>
								</TableCell>
								<TableCell className='font-medium'>
									Laser Lemonade Machine
								</TableCell>

								<TableCell>$499.99</TableCell>
								<TableCell className='hidden md:table-cell'>25</TableCell>
								<TableCell className='hidden md:table-cell'>
									2023-07-12 10:42 AM
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup='true' size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
												<span className='sr-only'>Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='hidden sm:table-cell'>
									<Image
										alt='Product image'
										className='aspect-square rounded-md object-cover'
										height='64'
										src='/placeholder.svg'
										width='64'
									/>
								</TableCell>
								<TableCell className='font-medium'>
									Hypernova Headphones
								</TableCell>

								<TableCell>$129.99</TableCell>
								<TableCell className='hidden md:table-cell'>100</TableCell>
								<TableCell className='hidden md:table-cell'>
									2023-10-18 03:21 PM
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup='true' size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
												<span className='sr-only'>Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='hidden sm:table-cell'>
									<Image
										alt='Product image'
										className='aspect-square rounded-md object-cover'
										height='64'
										src='/placeholder.svg'
										width='64'
									/>
								</TableCell>
								<TableCell className='font-medium'>
									AeroGlow Desk Lamp
								</TableCell>

								<TableCell>$39.99</TableCell>
								<TableCell className='hidden md:table-cell'>50</TableCell>
								<TableCell className='hidden md:table-cell'>
									2023-11-29 08:15 AM
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup='true' size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
												<span className='sr-only'>Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='hidden sm:table-cell'>
									<Image
										alt='Product image'
										className='aspect-square rounded-md object-cover'
										height='64'
										src='/placeholder.svg'
										width='64'
									/>
								</TableCell>
								<TableCell className='font-medium'>
									TechTonic Energy Drink
								</TableCell>

								<TableCell>$2.99</TableCell>
								<TableCell className='hidden md:table-cell'>0</TableCell>
								<TableCell className='hidden md:table-cell'>
									2023-12-25 11:59 PM
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup='true' size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
												<span className='sr-only'>Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='hidden sm:table-cell'>
									<Image
										alt='Product image'
										className='aspect-square rounded-md object-cover'
										height='64'
										src='/placeholder.svg'
										width='64'
									/>
								</TableCell>
								<TableCell className='font-medium'>
									Gamer Gear Pro Controller
								</TableCell>

								<TableCell>$59.99</TableCell>
								<TableCell className='hidden md:table-cell'>75</TableCell>
								<TableCell className='hidden md:table-cell'>
									2024-01-01 12:00 AM
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup='true' size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
												<span className='sr-only'>Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='hidden sm:table-cell'>
									<Image
										alt='Product image'
										className='aspect-square rounded-md object-cover'
										height='64'
										src='/placeholder.svg'
										width='64'
									/>
								</TableCell>
								<TableCell className='font-medium'>
									Luminous VR Headset
								</TableCell>

								<TableCell>$199.99</TableCell>
								<TableCell className='hidden md:table-cell'>30</TableCell>
								<TableCell className='hidden md:table-cell'>
									2024-02-14 02:14 PM
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup='true' size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
												<span className='sr-only'>Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<div className='text-xs text-muted-foreground'>
						Showing <strong>1-10</strong> of <strong>32</strong> products
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
