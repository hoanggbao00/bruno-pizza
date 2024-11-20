enum USER_ROLE {
	USER,
	ADMIN,
}

interface IUser {
	id: string;
	email: string;
	avatar: string;
	fullName: string;
	role: USER_ROLE;
}
