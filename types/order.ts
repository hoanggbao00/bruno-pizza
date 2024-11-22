import { ICartItem } from "./cart-item";
import { IUser } from "./user";
import { IVoucher } from "./voucher";

// Enum for order status
export enum EOrderStatus {
  PENDING = 'PENDING',
  MAKING = 'MAKING',
  DELIVERING = 'DELIVERING',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  DONE = 'DONE'
}

// Enum for payment status
export enum EPaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED'
}

export enum EPaymentMethod {
  CASH = 'CASH',
  BANKING = 'BANKING'
}

export enum EDeliveryType {
  TAKE_AWAY = 'TAKE_AWAY',
  SHIP = 'SHIP'
}

export interface IOrder  {
  $id: string;
  user: IUser | null;
  items: ICartItem[];
  totalPrice: number;
  discountPrice: number | null;
  finalPrice: number;
  appliedVoucher: IVoucher | null;
  status: EOrderStatus;
  paymentStatus: EPaymentStatus;
  $createdAt: Date;
  $updatedAt: Date;
  
  // Existing optional fields
  deliveryType: EDeliveryType;
  deliveryAddress: string | null;
  paymentMethod: EPaymentMethod;
};