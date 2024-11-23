'use server';

import { IPizza } from '@/types/pizza';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { ID, Query } from 'node-appwrite';

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

		const newPizza = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			ID.unique(),
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

		console.log(pizzasList);

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

export const getPizzaById = async (pizzaId: string): Promise<IPizza> => {
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
		throw error;
	}
};

export const updatePizza = async (
	pizzaId: string,
	updatedPizza: Partial<IPizza>
): Promise<IPizza> => {
	try {
		const { databases } = await createAdminClient();

		const updatedDocument = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			pizzaId,
			updatedPizza
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
