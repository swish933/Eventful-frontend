"use client";

import { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Home, PanelLeft, Search, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextType, UserContextType } from "@/@types/types";
import { grandstander } from "@/app/fonts";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { currentUser, clearUser } = useContext(
		UserContext
	) as UserContextType;
	const { deleteToken } = useContext(AuthContext) as AuthContextType;

	const logout = () => {
		deleteToken();
		clearUser();
	};

	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
				<nav className='flex flex-col items-center gap-4 px-2 py-4'>
					<Link
						href='/events'
						className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
					>
						<span
							className={`text-2xl transition-all group-hover:scale-110 ${grandstander.className}`}
						>
							E
						</span>
						<span className='sr-only'>Eventful</span>
					</Link>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='/events'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<Home className='h-5 w-5' />
									<span className='sr-only'>Dashboard</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Dashboard</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* <TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='/events/all'
									className='flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<Calendar className='h-5 w-5' />
									<span className='sr-only'>Events</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Events</TooltipContent>
						</Tooltip>
					</TooltipProvider> */}
				</nav>
				<nav className='mt-auto flex flex-col items-center gap-4 px-2 py-4'>
					{/* <TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href='/events/settings'
									className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
								>
									<Settings className='h-5 w-5' />
									<span className='sr-only'>Settings</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>Settings</TooltipContent>
						</Tooltip>
					</TooltipProvider> */}
				</nav>
			</aside>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
					<Sheet>
						<SheetTrigger asChild>
							<Button size='icon' variant='outline' className='sm:hidden'>
								<PanelLeft className='h-5 w-5' />
								<span className='sr-only'>Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='sm:max-w-xs'>
							<nav className='grid gap-6 text-lg font-medium'>
								<Link
									href='/events'
									className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
								>
									<span
										className={`text-xl transition-all group-hover:scale-110 ${grandstander.className}`}
									>
										E
									</span>
									<span className='sr-only'>Eventful</span>
								</Link>
								<Link
									href='/events'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<Home className='h-5 w-5' />
									Dashboard
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<Breadcrumb className='hidden md:flex'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href='/events'>Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Home</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className='relative ml-auto flex-1 md:grow-0'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search...'
							className='w-full rounded-radius pl-8 md:w-[200px] lg:w-[320px] bg-background dark:bg-background border-input dark:border-input focus-visible:ring-ring dark:focus-visible:ring-ring'
						/>
					</div>
					<ModeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								size='icon'
								className='overflow-hidden rounded-full bg-background dark:bg-background hover:bg-accent dark:hover:bg-accent border-border dark:border-border focus-visible:ring-ring dark:focus-visible:ring-ring h-9 w-9'
							>
								{currentUser?.avatar ? (
									<Image
										src={currentUser.avatar}
										width={36}
										height={36}
										alt='Avatar'
										className='object-cover'
									/>
								) : (
									<UserCircle className='h-9 w-9 stroke-1' />
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='bg-popover dark:bg-popover border-border dark:border-border'
						>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='focus:bg-accent dark:focus:bg-accent'
								onClick={() => logout()}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				{children}
			</div>
		</div>
	);
}
