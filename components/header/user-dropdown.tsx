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
import { useHistoryOrder } from '@/lib/stores/use-history-order';

export default function UserDropdown() {
	const { user, setUser } = useAuthStore();
	const { ids } = useHistoryOrder();

	const handleLogout = async () => {
		setUser(null);
		await signOutUser();
		toast.success('Log out successfully');
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
						{ids && ids.length > 0 && (
							<DropdownMenuItem asChild>
								<Link href='/history'>Order History</Link>
							</DropdownMenuItem>
						)}
						<DropdownMenuItem asChild>
							<Link href='/login'>Login</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href='/sign-up'>Sign Up</Link>
						</DropdownMenuItem>
					</>
				)}

				{user && (
					<>
						<DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
						<DropdownMenuItem asChild>
							<Link href='/history'>Order History</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<form onSubmit={handleLogout}>
								<button type='submit' className='text-brand'>
									Logout
								</button>
							</form>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
