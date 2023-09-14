import { useState, useContext } from "react";
import Checkout from "../Checkout/Checkout";
import { CartItem } from "../Interfaces/CartItem";
import { CartContext } from "../../Context/CartContext";

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(cartItems);
  // useEffect(() => {
  //   const cartItemsJson = localStorage.getItem("cart") || "[]";
  //   const parsedCartItems = JSON.parse(cartItemsJson);
  //   setCartItems(parsedCartItems);
  //   calculateTotalPrice(parsedCartItems);
  // }, []);

  // const isLoggedIn = () => {
  //   //en if sats
  //   setIsLoggedIn(true);
  // };

  const calculateTotalPrice = (product: CartItem[]) => {
    let total = 0;
    product.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  };

  const handleIncrement = (item: CartItem) => {
    const updatedCart = cartItems.map((cartItem: CartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handleDecrement = (item: CartItem) => {
    if (item.quantity === 1) {
      handleRemove(item);
    } else {
      const updatedCart = cartItems.map((cartItem: CartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCart);
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
      calculateTotalPrice(updatedCart);
    }
  };

  const handleRemove = (item: CartItem) => {
    const updatedCart = cartItems.filter(
      (cartItem: CartItem) => cartItem.name !== item.name
    );
    setCartItems(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  return (
    <div>
      <h2>Varukorg</h2>
      {cartItems.map((cartItem: CartItem, index: any) => (
        <div key={index}>
          <h3>{cartItem.name}</h3>
          <img src={cartItem.image} alt={cartItem.name} />
          <p>Antal: {cartItem.quantity}</p>
          <p>Pris per styck: {cartItem.price} kr</p>
          <p>Totalt: {cartItem.price * cartItem.quantity} kr</p>
          <button onClick={() => handleIncrement(cartItem)}>+</button>
          <button onClick={() => handleDecrement(cartItem)}>-</button>
          <button onClick={() => handleRemove(cartItem)}>Ta bort</button>
        </div>
      ))}
      <h4>Totalt att betala: {totalPrice} kr</h4>
      {/* {isLoggedIn ? <Checkout /> : <p>Logga in för att kunna betala</p>} */}
      <Checkout />
    </div>
  );
}

export default Cart;
