import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/context/UserContext";
import AuthProvider from "@/context/AuthContext";
import { rubik } from "@/app/fonts";

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
					`${rubik.className}`
				)}
			>
				<AuthProvider>
					<UserProvider>
						<ThemeProvider attribute='class' defaultTheme='dark'>
							{children}
							<Toaster position='top-right' richColors />
						</ThemeProvider>
					</UserProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
