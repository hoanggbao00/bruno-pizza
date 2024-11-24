export const APP_NAME = 'Bruno Pizza';
export const APP_SUBTITLE = 'More of Pizza Shop';
export const APP_DESCRIPTION =
	'There is a place where you can feel your coolest pizza';
export const currency = '₫';
export const PHONE_CONTACT = '0362555555';
export const DEFAULT_IMAGE =
	'/assets/images/photo-1628840042765-356cda07504e.png';
export const CATEGORY_CUSTOM = `6741e9b5003ad4b26ca4`
export const SIZE_CUSTOM = `6741fc5b00201060dd7f`
export const DEFAULT_CUSTOM_PRICE = 150000

export const ROUTES = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Menu',
		href: '/menu',
	},
	{
		label: 'Pizza Builder',
		href: '/pizza-builder',
	},
	{
		label: 'About Us',
		href: '/about',
	},
];

export const actionsDropdownItems = [
	{
		label: 'Rename',
		icon: '/assets/icons/edit.svg',
		value: 'rename',
	},
	{
		label: 'Details',
		icon: '/assets/icons/info.svg',
		value: 'details',
	},
	{
		label: 'Share',
		icon: '/assets/icons/share.svg',
		value: 'share',
	},
	{
		label: 'Download',
		icon: '/assets/icons/download.svg',
		value: 'download',
	},
	{
		label: 'Delete',
		icon: '/assets/icons/delete.svg',
		value: 'delete',
	},
];

export const sortTypes = [
	{
		label: 'Date created (newest)',
		value: '$createdAt-desc',
	},
	{
		label: 'Created Date (oldest)',
		value: '$createdAt-asc',
	},
	{
		label: 'Name (A-Z)',
		value: 'name-asc',
	},
	{
		label: 'Name (Z-A)',
		value: 'name-desc',
	},
	{
		label: 'Size (Highest)',
		value: 'size-desc',
	},
	{
		label: 'Size (Lowest)',
		value: 'size-asc',
	},
];

export const avatarPlaceholderUrl =
	'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
