export enum PaymentType {
  MANUAL = 'MANUAL',
}
export interface IPayment {
  paymentType: PaymentType;
  isEnabled: boolean;
  isDefault: boolean;
}
