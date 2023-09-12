import {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { CartItem } from "../component/Interfaces/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // { product: "price_1NnKkQHGDNbcqHddO65c8zUb", quantity: 5 },
  ]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
