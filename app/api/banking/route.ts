import { createAdminClient } from '@/lib/appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { EPaymentMethod, EPaymentStatus, IOrder } from '@/types/order';
import { NextRequest, NextResponse } from 'next/server';
import { Query } from 'node-appwrite';

export interface SepayWebhook {
	id: number;
	gateway: string;
	transactionDate: Date;
	accountNumber: string;
	code: null;
	content: string;
	transferType: string;
	transferAmount: number;
	accumulated: number;
	subAccount: null;
	referenceCode: string;
	description: string;
}

export const POST = async (req: NextRequest) => {
	const body = (await req.json()) as SepayWebhook;
	const { databases } = await createAdminClient();
	try {
		const orders = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			[
				Query.equal('paymentMethod', EPaymentMethod.BANKING),
				Query.equal('paymentStatus', EPaymentStatus.UNPAID),
				Query.limit(10),
			]
		);

		orders.documents.forEach(async (item: any) => {
			if (
				body.content.includes(item.$id) &&
				(item as IOrder).finalPrice === body.transferAmount
			) {
				await databases.updateDocument(
					appwriteConfig.databaseId,
					appwriteConfig.ordersCollectionId,
					item.$id,
					{
						paymentStatus: EPaymentStatus.PAID,
					}
				);
			}
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
};
