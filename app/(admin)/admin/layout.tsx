'use client';

import AdminAuth from '@/components/admin/admin-auth';
import { Sidebar } from '@/components/admin/admin-sidebar';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ConfirmDialog = dynamic(() => import('@/components/confirm-dialog'));

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isAdmin, setAdmin] = useState(false);

	useEffect(() => {}, []);

	return (
		<div className='flex h-screen bg-gray-100'>
			<Sidebar />
			<main className='flex-1 overflow-y-auto p-8'>
				{isAdmin && children}
				{!isAdmin && <AdminAuth isAdmin={isAdmin} setAdmin={setAdmin} />}
				<ConfirmDialog />
			</main>
		</div>
	);
}
