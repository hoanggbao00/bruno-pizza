'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { getChartData } from '@/lib/actions/dashboard.action';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronDown, Loader2, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

// const initialChartData = [
// 	{ date: '2024-04-01', price: 222 },
// 	{ date: '2024-04-02', price: 97 },
// 	{ date: '2024-04-03', price: 167 },
// 	{ date: '2024-04-04', price: 242 },
// 	{ date: '2024-04-05', price: 373 },
// 	{ date: '2024-04-06', price: 301 },
// 	{ date: '2024-04-07', price: 245 },
// 	{ date: '2024-04-08', price: 409 },
// 	{ date: '2024-04-09', price: 59 },
// 	{ date: '2024-04-10', price: 261 },
// 	{ date: '2024-04-11', price: 327 },
// 	{ date: '2024-04-12', price: 292 },
// 	{ date: '2024-04-13', price: 342 },
// 	{ date: '2024-04-14', price: 137 },
// 	{ date: '2024-04-15', price: 120 },
// 	{ date: '2024-04-16', price: 138 },
// 	{ date: '2024-04-17', price: 446 },
// 	{ date: '2024-04-18', price: 364 },
// 	{ date: '2024-04-19', price: 243 },
// 	{ date: '2024-04-20', price: 89 },
// 	{ date: '2024-04-21', price: 137 },
// 	{ date: '2024-04-22', price: 224 },
// 	{ date: '2024-04-23', price: 138 },
// 	{ date: '2024-04-24', price: 387 },
// 	{ date: '2024-04-25', price: 215 },
// 	{ date: '2024-04-26', price: 75 },
// 	{ date: '2024-04-27', price: 383 },
// 	{ date: '2024-04-28', price: 122 },
// 	{ date: '2024-04-29', price: 315 },
// 	{ date: '2024-04-30', price: 454 },
// 	{ date: '2024-05-01', price: 165 },
// 	{ date: '2024-05-02', price: 293 },
// 	{ date: '2024-05-03', price: 247 },
// 	{ date: '2024-05-04', price: 385 },
// 	{ date: '2024-05-05', price: 481 },
// 	{ date: '2024-05-06', price: 498 },
// 	{ date: '2024-05-07', price: 388 },
// 	{ date: '2024-05-08', price: 149 },
// 	{ date: '2024-05-09', price: 227 },
// 	{ date: '2024-05-10', price: 293 },
// 	{ date: '2024-05-11', price: 335 },
// 	{ date: '2024-05-12', price: 197 },
// 	{ date: '2024-05-13', price: 197 },
// 	{ date: '2024-05-14', price: 448 },
// 	{ date: '2024-05-15', price: 473 },
// 	{ date: '2024-05-16', price: 338 },
// 	{ date: '2024-05-17', price: 499 },
// 	{ date: '2024-05-18', price: 315 },
// 	{ date: '2024-05-19', price: 235 },
// 	{ date: '2024-05-20', price: 177 },
// 	{ date: '2024-05-21', price: 82 },
// 	{ date: '2024-05-22', price: 81 },
// 	{ date: '2024-05-23', price: 252 },
// 	{ date: '2024-05-24', price: 294 },
// 	{ date: '2024-05-25', price: 201 },
// 	{ date: '2024-05-26', price: 213 },
// 	{ date: '2024-05-27', price: 420 },
// 	{ date: '2024-05-28', price: 233 },
// 	{ date: '2024-05-29', price: 78 },
// 	{ date: '2024-05-30', price: 340 },
// 	{ date: '2024-05-31', price: 178 },
// 	{ date: '2024-06-01', price: 178 },
// 	{ date: '2024-06-02', price: 470 },
// 	{ date: '2024-06-03', price: 103 },
// 	{ date: '2024-06-04', price: 439 },
// 	{ date: '2024-06-05', price: 88 },
// 	{ date: '2024-06-06', price: 294 },
// 	{ date: '2024-06-07', price: 323 },
// 	{ date: '2024-06-08', price: 385 },
// 	{ date: '2024-06-09', price: 438 },
// 	{ date: '2024-06-10', price: 155 },
// 	{ date: '2024-06-11', price: 92 },
// 	{ date: '2024-06-12', price: 492 },
// 	{ date: '2024-06-13', price: 81 },
// 	{ date: '2024-06-14', price: 426 },
// 	{ date: '2024-06-15', price: 307 },
// 	{ date: '2024-06-16', price: 371 },
// 	{ date: '2024-06-17', price: 475 },
// 	{ date: '2024-06-18', price: 107 },
// 	{ date: '2024-06-19', price: 341 },
// 	{ date: '2024-06-20', price: 408 },
// 	{ date: '2024-06-21', price: 169 },
// 	{ date: '2024-06-22', price: 317 },
// 	{ date: '2024-06-23', price: 480 },
// 	{ date: '2024-06-24', price: 132 },
// 	{ date: '2024-06-25', price: 141 },
// 	{ date: '2024-06-26', price: 434 },
// 	{ date: '2024-06-27', price: 448 },
// 	{ date: '2024-06-28', price: 149 },
// 	{ date: '2024-06-29', price: 103 },
// 	{ date: '2024-06-30', price: 446 },
// ];

const chartConfig = {
	total: {
		label: 'Value',
	},
	price: {
		label: 'Price',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export default function AdminChart() {
	const [chartData, setChartData] =
		React.useState<{ date: string; price: number }[]>([]);
	const [numberOfMonths, setNumberOfMonths] = React.useState(3);
	const [loading, setLoading] = React.useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const orders = await getChartData(numberOfMonths);
			setChartData(orders);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong to fetch chart data');
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (numberOfMonths) {
			fetchData();
			// toast.warning('Đang fake data chart');
			return;
		}
	}, [numberOfMonths]);

	const total = React.useMemo(
		() => ({
			price: chartData.reduce((acc, curr) => acc + curr.price, 0),
		}),
		[chartData]
	);

	return (
		<Card>
			<CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
				<div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
					<CardTitle>
						Total revenue
						<Button
							variant={'outline'}
							size={'sm'}
							disabled={loading}
							onClick={fetchData}
							className='ml-2'
						>
							{loading ? (
								<Loader2 className='animate-spin inline-block mr-2 size-4' />
							) : (
								<RefreshCcw className='size-4 inline-block' />
							)}
							Refresh
						</Button>
					</CardTitle>
					<CardDescription>
						Display revenue over {' '}
						<DropdownMenu>
							<DropdownMenuTrigger className='border rounded-sm px-0.5'>
								{numberOfMonths} <ChevronDown className='inline-block size-4' />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
									<DropdownMenuItem
										key={month}
										onClick={() => setNumberOfMonths(month)}
									>
										{month}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>{' '}
						months nearly
					</CardDescription>
				</div>
				<div className='flex'>
					<p className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6'>
						Revenue: {total.price.toLocaleString()} đ
					</p>
				</div>
			</CardHeader>
			<CardContent className='px-2 sm:p-6'>
				{loading && (
					<p className='text-center'>
						<Loader2 className='inline-block mr-2' /> Fetching ...
					</p>
				)}
				{!loading && chartData.length === 0 && (
					<p className='text-center'>
						Data is empty on {numberOfMonths} months nearly
					</p>
				)}
				{!loading && chartData.length > 0 && (
					<ChartContainer
						config={chartConfig}
						className='aspect-auto h-[250px] w-full'
					>
						<BarChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey='date'
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={(value) => {
									const date = new Date(value);
									return date.toLocaleDateString('vi-VI', {
										month: 'short',
										day: 'numeric',
									});
								}}
							/>
							<ChartTooltip
								content={
									<ChartTooltipContent
										className='w-[150px]'
										nameKey='total'
										labelFormatter={(value) => {
											return new Date(value).toLocaleDateString('vi-VI', {
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											});
										}}
									/>
								}
							/>
							<Bar dataKey={'price'} fill={`var(--color-${'price'})`} />
						</BarChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
