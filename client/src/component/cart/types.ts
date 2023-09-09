// types.ts
export interface CartItem {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
  };
  quantity: number;
}
