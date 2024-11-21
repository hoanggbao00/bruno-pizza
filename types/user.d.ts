enum USER_ROLE {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

interface IUser {
	$id: string;
	email: string;
	fullName: string;
	role: USER_ROLE;
	accountId: string

	$createdAt: Date;
	$updatedAt: Date;
}
