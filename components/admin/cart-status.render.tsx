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
				return 'ĐANG CHỜ';
			case EOrderStatus.MAKING:
				return 'ĐANG LÀM';
			case EOrderStatus.DELIVERING:
				return 'ĐANG GIAO';
			case EOrderStatus.REJECTED:
				return 'ĐÃ TỪ CHỐI';
			case EOrderStatus.CANCELED:
				return 'ĐÃ HỦY';
			case EOrderStatus.DONE:
				return 'HOÀN THÀNH';
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
