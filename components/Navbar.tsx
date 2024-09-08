import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

type IconProps = {
	className?: string;
};

export default function Component() {
	return (
		<header className='flex h-20 border-b border-b-muted w-full shrink-0 items-center px-4 md:px-6'>
			<Sheet>
				<SheetTrigger asChild className='bg-background dark:bg-background'>
					<Button
						variant='outline'
						size='icon'
						className='lg:hidden bg-background dark:bg-background hover:bg-accent dark:hover:bg-accent border-border dark:border-border'
					>
						<MenuIcon className='h-6 w-6' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side='left'
					className='bg-popover dark:bg-popover border-border dark:border-border text-foreground dark:text-foreground'
				>
					<Link href='#' className='mr-6 hidden lg:flex' prefetch={false}>
						<p>Eventful</p>
						<MountainIcon className='h-6 w-6' />
						<span className='sr-only'>Eventful</span>
					</Link>
					<div className='grid gap-2 py-6'>
						<Link
							href='/events'
							className='flex w-full items-center py-2 text-lg font-semibold'
							prefetch={false}
						>
							Find events
						</Link>
						<Link
							href='/create-events'
							className='flex w-full items-center py-2 text-lg font-semibold'
							prefetch={false}
						>
							Create events
						</Link>
						<Link
							href='/login'
							className='flex w-full items-center py-2 text-lg font-semibold'
							prefetch={false}
						>
							Login
						</Link>
						<Link
							href='/signup'
							className='flex w-full items-center py-2 text-lg font-semibold'
							prefetch={false}
						>
							Signup
						</Link>
					</div>
				</SheetContent>
			</Sheet>
			<Link href='/' className='mr-6 hidden lg:flex' prefetch={false}>
				<MountainIcon className='h-6 w-6' />
				<span className='sr-only'>Acme Inc</span>
			</Link>
			<nav className='ml-auto hidden lg:flex gap-6'>
				<Link
					href='/events'
					className='text-muted-foreground hover:text-foreground rounded-radius p-2'
					prefetch={false}
				>
					Find events
				</Link>
				<Link
					href='/create-events'
					className='text-muted-foreground hover:text-foreground rounded-radius p-2'
					prefetch={false}
				>
					Create events
				</Link>
				<Link
					href='/login'
					className='text-muted-foreground hover:text-foreground rounded-radius p-2'
					prefetch={false}
				>
					Login
				</Link>
				<Link
					href='/signup'
					className='text-muted-foreground hover:text-foreground rounded-radius p-2'
					prefetch={false}
				>
					Signup
				</Link>
			</nav>
			<div className='ml-auto lg:ml-4'>
				<ModeToggle />
			</div>
		</header>
	);
}

function MenuIcon(props: IconProps) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	);
}

function MountainIcon(props: IconProps) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m8 3 4 8 5-5 5 15H2L8 3z' />
		</svg>
	);
}
