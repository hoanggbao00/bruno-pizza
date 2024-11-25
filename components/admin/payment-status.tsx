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
				return 'UNPAID';
			case EPaymentStatus.PAID:
				return 'PAID';
			case EPaymentStatus.REFUNDED:
				return 'REFUNDED';
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
