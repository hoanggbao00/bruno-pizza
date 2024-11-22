'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useConfirm } from '@/lib/stores/use-confirm';
import { cn } from '@/lib/utils';
import { InfoIcon, Loader2, TriangleAlert } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

const ConfirmDialog = () => {
	const { type, isOpen, message, setOpen, close, ok } = useConfirm();
	const [isLoading, setLoading] = useState(false);

	const title = useMemo(() => {
		switch (type) {
			case 'danger':
				return 'Xác nhận xoá';
			default:
				return 'Xác nhận';
		}
	}, [type]);

	const okText = useMemo(() => {
		switch (type) {
			case 'danger':
				return 'Xoá';
			default:
				return 'Xác nhận';
		}
	}, [type]);

	const handleOk = useCallback(async () => {
		try {
			setLoading(true);
			if (ok) await ok();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}

		setOpen(false);
	}, [isOpen, ok]);

	const handleCancel = useCallback(async () => {
		if (close) await close();
		setOpen(false);
	}, [isOpen, close]);

	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className='flex gap-1 items-center'>
						<div
							className={cn(
								'rounded-full p-1 bg-yellow-400 text-orange',
								{
									'bg-red text-white': type === 'danger',
								},
								{
									'bg-blue text-white': type === 'alert',
								}
							)}
						>
							{type !== 'alert' ? (
								<TriangleAlert size={14} />
							) : (
								<InfoIcon size={14} />
							)}
						</div>
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription>{message}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{type !== 'alert' && (
						<AlertDialogCancel onClick={handleCancel}>Hủy bỏ</AlertDialogCancel>
					)}
					<AlertDialogAction
						onClick={handleOk}
						className={cn(
							{
								'bg-orange-400 hover:bg-orange-400/80': type === 'warning',
							},
							{
								'bg-red hover:bg-red/80': type === 'danger',
							}
						)}
						disabled={isLoading}
					>
						{isLoading && <Loader2 className='inline-block animate-spin' />}
						{isLoading ? 'Đang thực thi' : okText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmDialog;