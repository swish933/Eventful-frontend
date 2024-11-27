"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type Props = {
	description: string;
	data: number | string;
};

export default function AnalyticsCard({ description, data }: Props) {
	return (
		<Card className='flex flex-col items-center gap-4 p-2 bg-card dark:bg-card text-foreground dark:text-foreground border-border dark:border-border'>
			<CardHeader className='items-center'>
				<CardTitle>{description}</CardTitle>
			</CardHeader>
			<CardContent className='flex-1'>
				<p className='text-3xl'>{data ? data : "-"}</p>
			</CardContent>
		</Card>
	);
}
