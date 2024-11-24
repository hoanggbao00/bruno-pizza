'use server';

import { EPaymentStatus, IOrder } from '@/types/order';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { ID, Query } from 'node-appwrite';
import { ICartItem } from '@/types/cart-item';

export const createOrderWithCartItems = async (
	cartItems: Omit<ICartItem, '$id' | '$createdAt' | '$updatedAt'>[],
	orderData: Omit<IOrder, '$id' | '$createdAt' | '$updatedAt' | 'items'>
) => {
	try {
		const { databases } = await createAdminClient();

		// First, create cart items
		const createdCartItems = await Promise.all(
			cartItems.map(async (cartItem) => {
				const createdCartItem = await databases.createDocument(
					appwriteConfig.databaseId,
					appwriteConfig.cartItemsCollectionId,
					ID.unique(),
					cartItem
				);
				return createdCartItem;
			})
		);

		// Then create order with references to cart items
		const newOrder = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			ID.unique(),
			{
				...orderData,
				items: createdCartItems.map((item) => item.$id),
			}
		);

		return { order: newOrder, cartItems: createdCartItems };
	} catch (error) {
		console.error('Error creating order with cart items:', error);
		throw error;
	}
};

export const updateOrder = async (
	orderId: string,
	updates: Partial<Pick<IOrder, 'status' | 'paymentStatus'>>
) => {
	try {
		const { databases } = await createAdminClient();

		const updatedOrder = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			orderId,
			updates
		);

		return updatedOrder;
	} catch (error) {
		console.error('Error updating order:', error);
		throw error;
	}
};

export const getOrders = async (): Promise<IOrder[]> => {
	try {
		const { databases } = await createAdminClient();

		const order = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId
		);

		return order.documents.map((order) => ({
			$id: order.$id,
			status: order.status,
			paymentStatus: order.paymentStatus,
			items: order.items,
			totalPrice: order.totalPrice,
			discountPrice: order.discountPrice,
			finalPrice: order.finalPrice,
			appliedVoucher: order.appliedVoucher,
			phoneNumber: order.phoneNumber,
			deliveryType: order.deliveryType,
			deliveryAddress: order.deliveryAddress,
			paymentMethod: order.paymentMethod,
			$createdAt: order.$createdAt,
			$updatedAt: order.$updatedAt,
			name: order.name,
		}));
	} catch (error) {
		console.error('Error getting order:', error);
		throw error;
	}
};

export const deleteOrder = async (orderId: string) => {
	try {
		const { databases } = await createAdminClient();

		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			orderId
		);

		return { success: true, message: 'Order deleted successfully' };
	} catch (error) {
		console.error('Error deleting order:', error);
		throw error;
	}
};

export const getOrderByListId = async (listId: string[]): Promise<IOrder[]> => {
	try {
		const { databases } = await createAdminClient();

		const order = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			[Query.equal('$id', listId), Query.orderDesc('$createdAt')]
		);

		return order.documents.map((order) => ({
			$id: order.$id,
			status: order.status,
			paymentStatus: order.paymentStatus,
			items: order.items,
			totalPrice: order.totalPrice,
			discountPrice: order.discountPrice,
			finalPrice: order.finalPrice,
			appliedVoucher: order.appliedVoucher,
			phoneNumber: order.phoneNumber,
			deliveryType: order.deliveryType,
			deliveryAddress: order.deliveryAddress,
			paymentMethod: order.paymentMethod,
			$createdAt: order.$createdAt,
			$updatedAt: order.$updatedAt,
			name: order.name,
		}));
	} catch (error) {
		console.error('Error getting order:', error);
		throw error;
	}
};

export const checkOrderPaid = async (cartId: string) => {
	try {
		const { databases } = await createAdminClient();

		const order = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			[
				Query.equal('$id', cartId),
				Query.equal('paymentStatus', EPaymentStatus.PAID),
			]
		);

		return order.total > 0 ? true : false;
	} catch (error) {
		console.error('Error getting order:', error);
		throw error;
	}
};
