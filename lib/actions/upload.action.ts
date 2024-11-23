'use server';

import { ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';

export const uploadImage = async (file: File) => {
	const { storage } = await createAdminClient();
	try {
		const res = await storage.createFile(
			appwriteConfig.bucketId,
			ID.unique(),
			file
		);

		if (!res.$id) {
			throw new Error();
		}

		const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.bucketId}/files/${res.$id}/preview?project=${appwriteConfig.projectId}`;

		return imageUrl;
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};

export const deleteImage = async (imageId: string) => {
	const { storage } = await createAdminClient();
	try {
		await storage.deleteFile(
			appwriteConfig.bucketId,
			imageId
		);
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};
