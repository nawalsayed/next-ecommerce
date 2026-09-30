import type { CartItem } from "@/context/CartContext";

export interface DemoOrder {
  orderNumber: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  paymentMethod: "Cash on Delivery" | "Card (demo)";
}
