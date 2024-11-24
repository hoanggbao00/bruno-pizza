import { formatDate } from 'date-fns';

// https://qr.sepay.vn/banks.json - https://qr.sepay.vn/
const BANK_INFO = {
	bankCode: 'MB', //MB Bank
	bankNumber: '0362554500',
	bankName: 'NGUYEN HAI TIEN',
	template: 'compact', // compact hoặc qronly
};

export const getQrCodeUrl = (message: string, price: number) => {
	return `https://qr.sepay.vn/img?acc=${BANK_INFO.bankNumber}&bank=${BANK_INFO.bankCode}&amount=${price}&des=${message}&template=${BANK_INFO.template}&download=DOWNLOAD`;
};

const headers = new Headers({
	'Content-Type': 'application/json',
	Authorization: `Bearer ${process.env.NEXT_PUBLIC_SEPAY_API_KEY}`,
});

const sepayUrl = `https://my.sepay.vn/userapi/transactions`;

export const checkPaid = async (cartId: string) => {
	const minDateStr = formatDate(new Date(), 'YYYY-MM-dd') + ' 00:00:000';
	try {
		const res = await fetch(
			`${sepayUrl}/list?transaction_date_min=${minDateStr}`,
			{
				method: 'GET',
				headers,
			}
		);

		if(!res.ok) throw new Error()

		const data = await res.json();

		return data
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};
