// Enum for Voucher Type
export enum EVoucherType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT'
}

// Voucher Type Definition
interface IVoucher {
  $id: string;
  code: string;
  name: string | null;
  description: string | null;
  type: EVoucherType;
  value: number; // Percentage or fixed amount
  
  // Validity
  startDate: Date;
  endDate: Date;
  
  // Usage Restrictions
  maxUsageCount: number | null; // Total times voucher can be used
  
  // Tracking
  currentUsageCount: number;
  isActive: boolean;
  
  $createdAt: string;
  $updatedAt: string;
};