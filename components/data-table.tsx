'use client';

import React, { useMemo } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface Column {
	key: string;
	label: string;
	render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
	columns: Column[];
	data: any[];
	onEdit?: (item: any) => void;
	onDelete?: (item: any) => void;
	isLoading?: boolean;
}

export const DataTable = ({
	columns,
	data,
	onEdit,
	onDelete,
	isLoading,
}: DataTableProps) => {
	const renderTable = useMemo(() => {
		if (!isLoading)
			return data.map((item, index) => (
				<TableRow key={item.$id || index}>
					{columns.map((column) => (
						<TableCell key={column.key} className='text-center'>
							{column.render
								? column.render(item[column.key])
								: item[column.key]}
						</TableCell>
					))}
					{(onEdit || onDelete) && (
						<TableCell className='text-center'>
							<div className='flex gap-2 justify-end'>
								{onEdit && (
									<Button
										variant='outline'
										size='icon'
										onClick={() => onEdit(item)}
										className='bg-yellow-400/50 hover:bg-yellow-500'
									>
										<Edit className='h-4 w-4' />
									</Button>
								)}
								{onDelete && (
									<Button
										variant='outline'
										size='icon'
										className='bg-rose-400/50 hover:bg-rose-500'
										onClick={() => onDelete(item)}
									>
										<Trash className='h-4 w-4' />
									</Button>
								)}
							</div>
						</TableCell>
					)}
				</TableRow>
			));

		if (isLoading)
			return Array(3)
				.fill(0)
				.map((_, index) => (
					<TableRow key={index}>
						{columns.map((column) => (
							<TableCell key={column.key}>
								<div className='h-4 bg-slate-200 animate-pulse rounded-full' />
							</TableCell>
						))}
					</TableRow>
				));
	}, [data, isLoading]);

	return (
		<div className='w-full'>
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHead key={column.key} className='text-center'>{column.label}</TableHead>
						))}
						{(onEdit || onDelete) && <TableHead className='text-center w-[150px]'>Actions</TableHead>}
					</TableRow>
				</TableHeader>
				<TableBody>{renderTable}</TableBody>
			</Table>
		</div>
	);
};
