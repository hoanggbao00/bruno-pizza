
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
