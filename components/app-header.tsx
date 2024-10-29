"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { AuthContextType, UserContextType } from "@/@types/types";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { grandstander } from "@/app/fonts";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AppHeader() {
	const { currentUser } = useContext(UserContext) as UserContextType;
	const { deleteToken } = useContext(AuthContext) as AuthContextType;
	const router = useRouter();

	const capitalized = (word: string): string =>
		word.charAt(0).toUpperCase() + word.slice(1);

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
							className='overflow-hidden rounded-full bg-background dark:bg-background hover:bg-accent dark:hover:bg-accent border-border dark:border-border focus-visible:ring-ring dark:focus-visible:ring-ring h-9 w-9'
						>
							{currentUser?.avatar ? (
								<Image
									width={36}
									height={36}
									src={currentUser.avatar}
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
						<DropdownMenuLabel>
							{currentUser
								? `${capitalized(currentUser.username)}'s Account`
								: `My Account`}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className='focus:bg-accent dark:focus:bg-accent'
							onClick={() => router.push("/orders")}
						>
							Orders
						</DropdownMenuItem>
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
