"use client";

import { useOrders } from "@/lib/hooks/orders";

export default function Page() {
	const { data, isLoading } = useOrders();

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return <div>Orders page</div>;
}
