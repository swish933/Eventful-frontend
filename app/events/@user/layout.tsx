import AppHeader from "@/components/app-header";

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AppHeader />
			<div className='px-4 md:px-6 my-10'>{children}</div>
		</>
	);
}
