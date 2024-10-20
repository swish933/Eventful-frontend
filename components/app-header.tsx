"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { AuthContextType, UserContextType } from "@/@types/types";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { grandstander } from "@/app/fonts";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function AppHeader() {
	const { currentUser } = useContext(UserContext) as UserContextType;
	const { deleteToken } = useContext(AuthContext) as AuthContextType;

	const logout = (): void => {
		deleteToken();
	};

	return (
		<header className='flex sticky top-0 bg-transparent text-foreground h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 z-50 isolate backdrop-blur'>
			<Link href='/events'>
				<p className={`text-3xl font-semibold ${grandstander.className}`}>
					Eventful
				</p>
			</Link>
			<div className='flex items-center gap-4'>
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='overflow-hidden rounded-full bg-background dark:bg-background hover:bg-accent dark:hover:bg-accent border-border dark:border-border focus-visible:ring-ring dark:focus-visible:ring-ring'
						>
							{currentUser?.avatar ? (
								<Image
									src={currentUser.avatar}
									width={36}
									height={36}
									alt='Avatar'
									className='overflow-hidden rounded-full'
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
			</div>
		</header>
	);
}
