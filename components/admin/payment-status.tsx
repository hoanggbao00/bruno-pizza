'use client';
import { useMemo } from 'react';
import { Badge } from '../ui/badge';
import { EPaymentStatus } from '@/types/order';
import { cn } from '@/lib/utils';

interface Props {
	status: EPaymentStatus;
}

export default function PaymenStatus({ status }: Props) {
	const title = useMemo(() => {
		switch (status) {
			case EPaymentStatus.UNPAID:
				return 'Chưa thanh toán';
			case EPaymentStatus.PAID:
				return 'Đã thanh toán';
			case EPaymentStatus.REFUNDED:
				return 'Đã hoàn tiền';
		}
	}, [status]);

	return (
		<Badge
			className={cn('cursor-pointer', {
				'bg-gray-500': status === EPaymentStatus.UNPAID,
				'bg-green': status === EPaymentStatus.PAID,
				'bg-red': status === EPaymentStatus.REFUNDED,
			})}
		>
			{title}
		</Badge>
	);
}
