'use server';

import { EPizzaStockStatus, IPizza } from '@/types/pizza';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { ID } from 'node-appwrite';
import {
	CATEGORY_CUSTOM,
	DEFAULT_CUSTOM_PRICE,
	SIZE_CUSTOM,
} from '@/shared/constants';
import { ICartItem } from '@/types/cart-item';
import {
	EDeliveryType,
	EOrderStatus,
	EPaymentMethod,
	EPaymentStatus,
	IOrder,
} from '@/types/order';
import { ITopping } from '@/types/topping';
import { IUser } from '@/types/user';

export const createPizza = async (
	pizza: Omit<IPizza, '$id' | '$createdAt' | '$updatedAt'>
): Promise<IPizza> => {
	try {
		const { databases } = await createAdminClient();

		const values = {
			...pizza,
			category: pizza.category.$id,
			sizes: pizza.sizes.map((size) => size.$id),
			toppings: pizza.toppings.map((topping) => topping.$id),
		};

		const id = ID.unique();
		console.log(id, values);

		const newPizza = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			id,
			values
		);

		return {
			$id: newPizza.$id,
			name: newPizza.name,
			description: newPizza.description,
			images: newPizza.images,
			price: newPizza.price,
			stockStatus: newPizza.stockStatus,
			toppings: newPizza.toppings,
			sizes: newPizza.sizes,
			isAvailable: newPizza.isAvailable,
			isBestSeller: newPizza.isBestSeller,
			category: newPizza.category,
			currentStockQuantity: newPizza.currentStockQuantity,
			$createdAt: newPizza.$createdAt,
			$updatedAt: newPizza.$updatedAt,
		};
	} catch (error) {
		console.error('Error creating pizza:', error);
		throw error;
	}
};

export const getPizzas = async (): Promise<IPizza[]> => {
	try {
		const { databases } = await createAdminClient();

		const pizzasList = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId
		);

		return pizzasList.documents.map((p) => ({
			$id: p.$id,
			name: p.name,
			description: p.description,
			image: p.image,
			price: p.price,
			stockStatus: p.stockStatus,
			toppings: p.toppings,
			sizes: p.sizes,
			isAvailable: p.isAvailable,
			isBestSeller: p.isBestSeller,
			category: p.category,
			currentStockQuantity: p.currentStockQuantity,
			$createdAt: p.$createdAt,
			$updatedAt: p.$updatedAt,
			images: p.images,
		}));
	} catch (error) {
		console.error('Error fetching pizzas:', error);
		throw error;
	}
};

export const getPizzaById = async (pizzaId: string): Promise<IPizza | null> => {
	try {
		const { databases } = await createAdminClient();

		const pizza = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			pizzaId
		);

		return {
			$id: pizza.$id,
			name: pizza.name,
			description: pizza.description,
			price: pizza.price,
			stockStatus: pizza.stockStatus,
			toppings: pizza.toppings,
			sizes: pizza.sizes,
			isAvailable: pizza.isAvailable,
			isBestSeller: pizza.isBestSeller,
			category: pizza.category,
			currentStockQuantity: pizza.currentStockQuantity,
			$createdAt: pizza.$createdAt,
			$updatedAt: pizza.$updatedAt,
			images: pizza.images,
		};
	} catch (error) {
		console.error('Error fetching pizza:', error);
		return null;
	}
};

export const updatePizza = async (
	pizzaId: string,
	updatedPizza: Partial<IPizza>
): Promise<IPizza> => {
	try {
		const { databases } = await createAdminClient();

		if (updatedPizza.images) {
			// @ts-expect-error refac
			updatedPizza.images = [updatedPizza.images];
		}
		
		const updatedDocument = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			pizzaId,
			{
				...updatedPizza,
			}
		);

		return {
			$id: updatedDocument.$id,
			name: updatedDocument.name,
			description: updatedDocument.description,
			images: updatedDocument.images,
			price: updatedDocument.price,
			stockStatus: updatedDocument.stockStatus,
			toppings: updatedDocument.toppings,
			sizes: updatedDocument.sizes,
			isAvailable: updatedDocument.isAvailable,
			isBestSeller: updatedDocument.isBestSeller,
			category: updatedDocument.category,
			currentStockQuantity: updatedDocument.currentStockQuantity,
			$createdAt: updatedDocument.$createdAt,
			$updatedAt: updatedDocument.$updatedAt,
		};
	} catch (error) {
		console.error('Error updating pizza:', error);
		throw error;
	}
};

export const deletePizza = async (pizzaId: string) => {
	try {
		const { databases } = await createAdminClient();

		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			pizzaId
		);

		return { success: true, message: 'Pizza deleted successfully' };
	} catch (error) {
		console.error('Error deleting pizza:', error);
		throw error;
	}
};

export const getPizzasByCatSlug = async (
	categorySlug: string
): Promise<IPizza[]> => {
	try {
		const { databases } = await createAdminClient();

		const pizzasList = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId
		);

		let filteredPizzas: IPizza[] = pizzasList.documents.map((p) => ({
			$id: p.$id,
			name: p.name,
			description: p.description,
			image: p.image,
			price: p.price,
			stockStatus: p.stockStatus,
			toppings: p.toppings,
			sizes: p.sizes,
			isAvailable: p.isAvailable,
			isBestSeller: p.isBestSeller,
			category: p.category,
			currentStockQuantity: p.currentStockQuantity,
			$createdAt: p.$createdAt,
			$updatedAt: p.$updatedAt,
			images: p.images,
		}));

		if (categorySlug !== 'custom') {
			filteredPizzas = filteredPizzas.filter(
				(p) => p.category.slug !== 'custom'
			);
		}

		if (categorySlug !== 'all') {
			filteredPizzas = filteredPizzas.filter(
				(p) => p.category.slug === categorySlug
			);
		}

		return filteredPizzas;
	} catch (error) {
		console.error('Error fetching pizzas by category slug:', error);
		throw error;
	}
};

export const createCustomPizza = async (
	pizza: Omit<
		IPizza,
		| '$id'
		| '$createdAt'
		| '$updatedAt'
		| 'category'
		| 'price'
		| 'stockStatus'
		| 'currentStockQuantity'
		| 'sizes'
	>,
	user: Omit<IUser, '$createdAt' | '$updatedAt' | 'accountId'>
): Promise<{ $id: string; price: number }> => {
	try {
		const { databases } = await createAdminClient();

		// Tạo pizza
		const newValues: Omit<
			IPizza,
			'$id' | '$createdAt' | '$updatedAt' | 'category' | 'sizes' | 'toppings'
		> & { category: string; sizes: string[]; toppings: string[] } = {
			...pizza,
			description: `Pizza Custom by ${user.fullName}\n\n${pizza.description}`,
			category: CATEGORY_CUSTOM,
			sizes: [SIZE_CUSTOM],
			toppings: pizza.toppings.map((topping) => topping.$id),
			currentStockQuantity: 1,
			price: DEFAULT_CUSTOM_PRICE,
			stockStatus: EPizzaStockStatus.IN_STOCK,
			isAvailable: true,
		};

		const newPizza = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			ID.unique(),
			newValues
		);

		const fullPrice =
			DEFAULT_CUSTOM_PRICE +
			pizza.toppings.reduce((total, topping) => total + topping.price, 0);
		// Tạo cart Item
		const newItem: Omit<
			ICartItem,
			'$id' | 'pizzas' | 'selectedToppings' | 'selectedSize'
		> & {
			pizzas: string;
			selectedToppings: string[];
			selectedSize: string;
		} = {
			pizzas: newPizza.$id,
			selectedSize: SIZE_CUSTOM,
			selectedToppings: newPizza.toppings.map((t: ITopping) => t.$id),
			quantity: 1,
			totalPrice: fullPrice,
		};

		const cartItem = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.cartItemsCollectionId,
			ID.unique(),
			newItem
		);

		// tạo order
		const newOrder: Omit<IOrder, '$id' | 'items'> & { items: string[] } = {
			items: [cartItem.$id],
			phoneNumber: '',
			deliveryType: EDeliveryType.TAKE_AWAY,
			deliveryAddress: '',
			paymentMethod: EPaymentMethod.BANKING,
			totalPrice: fullPrice,
			discountPrice: 0,
			finalPrice: fullPrice,
			paymentStatus: EPaymentStatus.UNPAID,
			status: EOrderStatus.PENDING,
		};

		const order = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.ordersCollectionId,
			ID.unique(),
			newOrder
		);

		return {
			$id: order.$id,
			price: fullPrice,
		};
	} catch (error) {
		console.error('Error creating custom pizza:', error);
		throw error;
	}
};
