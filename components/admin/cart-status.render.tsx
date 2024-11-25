'use client';
import { EOrderStatus } from '@/types/order';
import { useMemo } from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface Props {
	status: EOrderStatus;
}

export default function CartStatusRender({ status }: Props) {
	const title = useMemo(() => {
		switch (status) {
			case EOrderStatus.PENDING:
				return 'PENDING';
			case EOrderStatus.MAKING:
				return 'MAKING';
			case EOrderStatus.DELIVERING:
				return 'DELIVERING';
			case EOrderStatus.REJECTED:
				return 'REJECTED';
			case EOrderStatus.CANCELED:
				return 'CANCELED';
			case EOrderStatus.DONE:
				return 'DONE';
		}
	}, [status]);

	return (
		<Badge
			className={cn('cursor-pointer', {
				'bg-gray-500': status === EOrderStatus.PENDING,
				'bg-blue': status === EOrderStatus.MAKING,
				'bg-yellow-300 text-black': status === EOrderStatus.DELIVERING,
				'bg-red': status === EOrderStatus.REJECTED,
				'bg-yellow-500': status === EOrderStatus.CANCELED,
				'bg-green': status === EOrderStatus.DONE,
			})}
		>
			{title}
		</Badge>
	);
}
