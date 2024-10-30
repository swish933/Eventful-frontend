"use client";

import { AuthContextType } from "@/@types/types";
import AppHeader from "@/components/app-header";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const { token } = useContext(AuthContext) as AuthContextType;

	useLayoutEffect(() => {
		if (!token) {
			router.replace("/login");
		}
	}, [token, router]);

	return (
		<>
			<AppHeader />
			<div className='px-4 md:px-6 mt-10 mb-4'>{children}</div>
		</>
	);
}
