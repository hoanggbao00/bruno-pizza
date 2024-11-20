import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User } from 'lucide-react';

export default function UserDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='size-9 hover:bg-gray-300 bg-gray-200 rounded-full inline-flex items-center justify-center cursor-pointer'>
					<User size={16}/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent >
				<DropdownMenuItem asChild>
					<Link href='/login'>Đăng nhập</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href='/sign-up'>Đăng ký</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
