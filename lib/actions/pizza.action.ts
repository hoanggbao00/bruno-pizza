import { IPizza } from '@/types/pizza';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { ID, Query } from 'node-appwrite';

export const createPizza = async (
	pizza: Omit<IPizza, '$id' | '$createdAt' | '$updatedAt'>
) => {
	try {
		const { databases } = await createAdminClient();

		const newPizza = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			ID.unique(),
			pizza
		);

		return newPizza;
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
) => {
	try {
		const { databases } = await createAdminClient();

		const updatedDocument = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.pizzasCollectionId,
			pizzaId,
			updatedPizza
		);

		return updatedDocument;
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
			appwriteConfig.pizzasCollectionId,
			[Query.equal('category.slug', [categorySlug])]
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
		console.error('Error fetching pizzas by category slug:', error);
		throw error;
	}
};
