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

export const CartContext = createContext<CartContextType>(null as any);

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
