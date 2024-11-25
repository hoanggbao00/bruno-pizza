'use server';

import { createAdminClient, createSessionClient } from '@/lib/appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { Query, ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { avatarPlaceholderUrl } from '@/shared/constants';
import { IUser } from '@/types/user';

const isEmailExists = async (email: string) => {
	const { databases } = await createAdminClient();

	const result = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal('email', [email]), Query.select(['email'])]
	);

	return result.total > 0 ? true : false;
};

// Đăng ký người dùng
export const signUp = async (
	email: string,
	password: string,
	fullName: string
) => {
	try {
		// Kiểm tra email đã tồn tại hay chưa
		const existingUser = await isEmailExists(email);
		if (existingUser) {
			throw new Error('Email đã tồn tại');
		}

		// Tạo mới user
		const { databases, account } = await createAdminClient();
		const user = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			ID.unique(),
			{
				email,
				fullName,
				avatar: avatarPlaceholderUrl,
			}
		);

		// Tạo mới account
		const accountData = await account.create(
			ID.unique(),
			email,
			password,
			fullName
		);

		// Update user
		await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			user.$id,
			{
				accountId: accountData.$id,
			}
		);

		return user.$id;
	} catch (error: any) {
		console.log(error);
		if ((error.message as string)?.includes('same')) {
			throw new Error('Email was exists');
		}

		throw new Error('Something wrong when sign up');
	}
};

// Đăng nhập
export const login = async (email: string, password: string) => {
	const { account, databases } = await createAdminClient();
	const cookieStore = await cookies();

	try {
		const data = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			[Query.equal('email', email)]
		);

		if (data.total <= 0) {
			throw new Error('Email or Password not valid');
		}
		const user: Omit<IUser, '$createdAt' | '$updatedAt' | 'accountId'> = {
			$id: data.documents[0].$id,
			email: data.documents[0].email,
			fullName: data.documents[0].fullName,
			role: data.documents[0].role,
		};

		const session = await account.createEmailPasswordSession(email, password);

		// Tạo cookies
		cookieStore.set('appwrite-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			expires: new Date(session.expire),
		});
		cookieStore.set('pizza-userId', JSON.stringify(user.$id), {
			expires: new Date(session.expire),
		});

		return user;
	} catch (error: any) {
		console.log(error);
		throw new Error('Email or Password not valid');
	}
};

export const signOutUser = async () => {
	const { account } = await createSessionClient();
	const cookieStore = await cookies();
	cookieStore.delete('appwrite-session');
	cookieStore.delete('pizza-userId');

	try {
		await account.deleteSession('current');
	} catch (error: any) {
		console.log(error);
		throw new Error(error);
	} finally {
		return true;
	}
};

export const getServerSession = async () => {
	const user = (await cookies()).get('user')?.value;

	if (!user) {
		return null;
	}

	return JSON.parse(user) as IUser;
};
