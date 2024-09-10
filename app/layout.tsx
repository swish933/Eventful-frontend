import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
	title: "Eventful",
	description: "An event management application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					"min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground antialiased",
					`font-sans`
				)}
			>
				<ThemeProvider attribute='class' defaultTheme='dark'>
					<ReactQueryProvider>{children}</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
