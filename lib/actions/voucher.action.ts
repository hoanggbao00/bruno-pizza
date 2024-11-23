'use server';

import { IVoucher } from '@/types/voucher';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { ID, Query } from 'node-appwrite';

export const createVoucher = async (
	voucher: Omit<IVoucher, '$id' | '$createdAt' | '$updatedAt'>
): Promise<IVoucher> => {
	try {
		const { databases } = await createAdminClient();

		const newVoucher = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId,
			ID.unique(),
			voucher
		);

		return {
			$id: newVoucher.$id,
			name: newVoucher.name,
			code: newVoucher.code,
			startDate: newVoucher.startDate,
			endDate: newVoucher.endDate,
			isActive: newVoucher.isActive,
			$createdAt: newVoucher.$createdAt,
			$updatedAt: newVoucher.$updatedAt,
			type: newVoucher.type,
			value: newVoucher.value,
			maxUsageCount: newVoucher.maxUsageCount,
			currentUsageCount: newVoucher.currentUsageCount,
			description: newVoucher.description,
		};
	} catch (error) {
		console.error('Error creating voucher:', error);
		throw error;
	}
};

export const getVouchers = async (): Promise<IVoucher[]> => {
	try {
		const { databases } = await createAdminClient();

		const vouchersList = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId
		);

		const vouchersExpired = vouchersList.documents.filter((voucher) => {
			const now = new Date();
			return now > new Date(voucher.endDate);
		});

		await Promise.all(
			vouchersExpired.map(
				async (voucher) =>
					await databases.updateDocument(
						appwriteConfig.databaseId,
						appwriteConfig.vouchersCollectionId,
						voucher.$id,
						{ isActive: false }
					)
			)
		);

		return vouchersList.documents.map((voucher) => ({
			$id: voucher.$id,
			name: voucher.name,
			code: voucher.code,
			discount: voucher.discount,
			startDate: voucher.startDate,
			endDate: voucher.endDate,
			isActive: vouchersExpired.find((v) => v.$id === voucher.$id)
				? false
				: voucher.isActive,
			$createdAt: voucher.$createdAt,
			$updatedAt: voucher.$updatedAt,
			type: voucher.type,
			value: voucher.value,
			maxUsageCount: voucher.maxUsageCount,
			currentUsageCount: voucher.currentUsageCount,
			description: voucher.description,
		}));
	} catch (error) {
		console.error('Error fetching vouchers:', error);
		throw error;
	}
};

export const getVoucherById = async (voucherId: string): Promise<IVoucher> => {
	try {
		const { databases } = await createAdminClient();

		const voucher = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId,
			voucherId
		);

		return {
			$id: voucher.$id,
			name: voucher.name,
			code: voucher.code,
			startDate: voucher.startDate,
			endDate: voucher.endDate,
			isActive: voucher.isActive,
			$createdAt: voucher.$createdAt,
			$updatedAt: voucher.$updatedAt,
			type: voucher.type,
			value: voucher.value,
			maxUsageCount: voucher.maxUsageCount,
			currentUsageCount: voucher.currentUsageCount,
			description: voucher.description,
		};
	} catch (error) {
		console.error('Error fetching voucher:', error);
		throw error;
	}
};

export const getVoucherByCode = async (
	code: string
): Promise<IVoucher | null> => {
	try {
		const { databases } = await createAdminClient();

		const result = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId,
			[Query.equal('code', [code]), Query.equal('isActive', true)]
		);

		return result.documents.length > 0
			? {
					$id: result.documents[0].$id,
					name: result.documents[0].name,
					code: result.documents[0].code,
					startDate: result.documents[0].startDate,
					endDate: result.documents[0].endDate,
					isActive: result.documents[0].isActive,
					$createdAt: result.documents[0].$createdAt,
					$updatedAt: result.documents[0].$updatedAt,
					type: result.documents[0].type,
					value: result.documents[0].value,
					maxUsageCount: result.documents[0].maxUsageCount,
					currentUsageCount: result.documents[0].currentUsageCount,
					description: result.documents[0].description,
			  }
			: null;
	} catch (error) {
		console.error('Error fetching voucher by code:', error);
		throw error;
	}
};

export const updateVoucher = async (
	voucherId: string,
	updatedVoucher: Partial<IVoucher>
) => {
	try {
		const { databases } = await createAdminClient();

		const updatedDocument = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId,
			voucherId,
			updatedVoucher
		);

		return updatedDocument;
	} catch (error) {
		console.error('Error updating voucher:', error);
		throw error;
	}
};

export const deleteVoucher = async (voucherId: string) => {
	try {
		const { databases } = await createAdminClient();

		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId,
			voucherId
		);

		return { success: true, message: 'Voucher deleted successfully' };
	} catch (error) {
		console.error('Error deleting voucher:', error);
		throw error;
	}
};

export const getActiveVouchers = async (): Promise<IVoucher[]> => {
	try {
		const { databases } = await createAdminClient();

		const now = new Date();
		const activeVouchers = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.vouchersCollectionId,
			[
				Query.equal('isActive', [true]),
				Query.lessThanEqual('startDate', now.toISOString()),
				Query.greaterThanEqual('endDate', now.toISOString()),
			]
		);

		return activeVouchers.documents.map((voucher) => ({
			$id: voucher.$id,
			name: voucher.name,
			code: voucher.code,
			discount: voucher.discount,
			startDate: voucher.startDate,
			endDate: voucher.endDate,
			isActive: voucher.isActive,
			$createdAt: voucher.$createdAt,
			$updatedAt: voucher.$updatedAt,
			type: voucher.type,
			value: voucher.value,
			maxUsageCount: voucher.maxUsageCount,
			currentUsageCount: voucher.currentUsageCount,
			description: voucher.description,
		}));
	} catch (error) {
		console.error('Error fetching active vouchers:', error);
		throw error;
	}
};
