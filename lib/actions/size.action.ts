import { ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';

// Create a new pizza size
export const createPizzaSize = async (pizzaSize: Omit<IPizzaSize, '$id'>) => {
	try {
		const { databases } = await createAdminClient();

		const newSize = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.sizesCollectionId,
			ID.unique(),
			pizzaSize
		);

		return newSize;
	} catch (error) {
		console.error('Error creating pizza size:', error);
		throw error;
	}
};

// Get all pizza sizes
export const getPizzaSizes = async (): Promise<IPizzaSize[]> => {
	try {
		const { databases } = await createAdminClient();

		const sizesList = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.sizesCollectionId
		);

		return sizesList.documents.map((size) => ({
			$id: size.$id,
			name: size.name,
			price: size.price,
		}));
	} catch (error) {
		console.error('Error fetching pizza sizes:', error);
		throw error;
	}
};

// Get a single pizza size by ID
export const getPizzaSizeById = async (sizeId: string): Promise<IPizzaSize> => {
	try {
		const { databases } = await createAdminClient();

		const size = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.sizesCollectionId,
			sizeId
		);

		return {
			$id: size.$id,
			name: size.name,
			price: size.price,
		};
	} catch (error) {
		console.error('Error fetching pizza size:', error);
		throw error;
	}
};

// Update a pizza size
export const updatePizzaSize = async (
	sizeId: string,
	updatedSize: Partial<IPizzaSize>
) => {
	try {
		const { databases } = await createAdminClient();

		const updatedDocument = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.sizesCollectionId,
			sizeId,
			updatedSize
		);

		return updatedDocument;
	} catch (error) {
		console.error('Error updating pizza size:', error);
		throw error;
	}
};

// Delete a pizza size
export const deletePizzaSize = async (sizeId: string) => {
	try {
		const { databases } = await createAdminClient();

		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.sizesCollectionId,
			sizeId
		);

		return { success: true, message: 'Pizza size deleted successfully' };
	} catch (error) {
		console.error('Error deleting pizza size:', error);
		throw error;
	}
};
