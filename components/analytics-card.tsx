"use client";

import React from "react";
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type Props = {
	description: string;
	data: number;
};

export default function AnalyticsCard({ description, data }: Props) {
	return (
		<Card className='flex flex-col gap-4 p-2'>
			<CardHeader className='items-center'>
				<CardTitle>{description}</CardTitle>
			</CardHeader>
			<CardContent className='flex-1'>
				<p className='text-3xl'>{data}</p>
			</CardContent>
		</Card>
	);
}
