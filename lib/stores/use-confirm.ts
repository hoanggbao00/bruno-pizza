import { create } from 'zustand';

type Handler = (...args: any[]) => Promise<any> | any;

interface State {
	isOpen: boolean;
	type: 'danger' | 'warning' | 'alert';
	message: string;
}

type ConfirmProps = (
	message: string,
	onOk: Handler,
	onClose?: Handler
) => Promise<void>;

type ConfirmAction = {
	danger: ConfirmProps;
	warning: ConfirmProps;
	alert: (message: string) => void;
};

interface Action {
	confirm: ConfirmAction;
	close?: (...args: any[]) => Promise<any> | any;
	ok?: (...args: any[]) => Promise<any> | any;
	setOpen: (value: boolean) => void;
}

export const useConfirm = create<State & Action>((set, get) => ({
	isOpen: false,
	type: 'warning',
	message: '',
	confirm: {
		danger: (message, onOk, onClose) => {
			return new Promise((resolve) => {
				set({
					type: 'danger',
					isOpen: true,
					message,
					close: onClose,
					ok: onOk,
				});
				resolve();
			});
		},
		warning: (message, onOk, onClose) => {
			return new Promise((resolve) => {
				set({
					type: 'warning',
					isOpen: true,
					message,
					close: onClose,
					ok: onOk,
				});
				resolve();
			});
		},
		alert: (message) => {
			set({
				type: 'alert',
				isOpen: true,
				message,
				close: () => {},
				ok: () => {},
			});
		},
	},
	setOpen: (value) => {
		set({
			isOpen: value,
			message: get().message,
			close: get().close,
			ok: get().ok,
		});
	},
}));
