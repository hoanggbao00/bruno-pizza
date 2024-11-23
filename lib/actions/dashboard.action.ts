'use server';

import { Query } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';

export const getTotalData = async () => {
	try {
		const { databases } = await createAdminClient();

		// Get total pizzas
		const pizzas = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId
		);

		// Get total Categories
		const categories = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId
		);

		// get active total voucher
		const vouchers = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId,
			[Query.equal('isActive', true)]
		);

		// Get total orders today
		const orders = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			[Query.greaterThanEqual('$createdAt', new Date().toISOString())]
		);

		return {
			pizza: pizzas.total,
			category: categories.total,
			voucher: vouchers.total,
			order: orders.total,
		};
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};

export const getChartData = async (
	numberOfMonth: number
): Promise<{ date: string; price: number }[]> => {
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - numberOfMonth);

	try {
		const { databases } = await createAdminClient();
		const orders = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			[Query.greaterThanEqual('$createdAt', startDate.toISOString())]
		);
		return orders.documents.map((order: any) => ({
			date: new Date(order.createdAt).toLocaleDateString(),
			price: order.finalPrice,
		}));
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};
