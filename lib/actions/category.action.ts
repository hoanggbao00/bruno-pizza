import { ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';

// Create a new category
export const createCategory = async (category: Omit<ICategory, '$id'>) => {
	try {
		const { databases } = await createAdminClient();

		const newCategory = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId,
			ID.unique(),
			category
		);

		return newCategory;
	} catch (error) {
		console.error('Error creating category:', error);
		throw error;
	}
};

// Get all categories
export const getCategories = async (): Promise<ICategory[]> => {
	try {
		const { databases } = await createAdminClient();

		const categoriesList = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId
		);

		return categoriesList.documents.map((c) => ({
			$id: c.$id,
			name: c.name,
			slug: c.slug,
		}));
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};

// Get a single category by ID
export const getCategoryById = async (categoryId: string): Promise<ICategory> => {
	try {
		const { databases } = await createAdminClient();

		const category = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId,
			categoryId
		);

		return {
      $id: category.$id,
      name: category.name,
      slug: category.slug,
    };
	} catch (error) {
		console.error('Error fetching category:', error);
		throw error;
	}
};

// Update a category
export const updateCategory = async (
	categoryId: string,
	updatedCategory: Partial<ICategory>
) => {
	try {
		const { databases } = await createAdminClient();

		const updatedDocument = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId,
			categoryId,
			updatedCategory
		);

		return updatedDocument;
	} catch (error) {
		console.error('Error updating category:', error);
		throw error;
	}
};

// Delete a category
export const deleteCategory = async (categoryId: string) => {
	try {
		const { databases } = await createAdminClient();

		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId,
			categoryId
		);

		return { success: true, message: 'Category deleted successfully' };
	} catch (error) {
		console.error('Error deleting category:', error);
		throw error;
	}
};
