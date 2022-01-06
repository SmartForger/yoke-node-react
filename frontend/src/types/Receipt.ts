export interface Receipt {
  id: string;
  productId: string;
  productName: string;
  price: number;
  userId: string;
  quantity: number;
  purchasedAt: Date;
}