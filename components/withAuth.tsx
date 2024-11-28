"use client";

import { isAuthenticated } from "@/lib/auth";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component: any) {
	return function IsAuth(props: any) {
		const router = useRouter();

		useLayoutEffect(() => {
			const isAuth = isAuthenticated();

			if (!isAuth) {
				router.replace("/login");
			}
		}, [router]);
		return <Component {...props} />;
	};
}
