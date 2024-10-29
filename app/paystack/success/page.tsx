"use client";

import { CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push("/orders");
		}, 3000);
	}, []);

	return (
		<div className='text-primary flex flex-col items-center justify-center h-screen'>
			<p className='text-lg font-medium'>Payment Successful!</p>
			<CircleCheck size={48} absoluteStrokeWidth />
		</div>
	);
}
