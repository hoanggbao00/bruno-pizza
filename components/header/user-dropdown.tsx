'use client';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/use-auth-store';
import { signOutUser } from '@/lib/actions/user.actions';
import { toast } from 'sonner';

export default function UserDropdown() {
	const { user, setUser } = useAuthStore();

	const handleLogout = async () => {
		await signOutUser();
		toast.success('Đăng xuất thành công.');
		setUser(null);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='size-9 hover:bg-gray-300 bg-gray-200 rounded-full inline-flex items-center justify-center cursor-pointer'>
					<User size={16} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{!user && (
					<>
						<DropdownMenuItem asChild>
							<Link href='/login'>Đăng nhập</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href='/sign-up'>Đăng ký</Link>
						</DropdownMenuItem>
					</>
				)}

				{user && (
					<>
						<DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
						<DropdownMenuItem asChild>
							<Link href='/history'>Lịch sử đặt hàng</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<form onSubmit={handleLogout}>
								<button type='submit' className='text-brand'>
									Đăng xuất
								</button>
							</form>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
