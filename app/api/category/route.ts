import { deleteCategory } from '@/lib/actions/category.action';
import { NextResponse } from 'next/server';

export const DELETE = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	if (!id) throw new Error('Missing id');

	try {
		const result = await deleteCategory(id);
		return NextResponse.json(result);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
};
