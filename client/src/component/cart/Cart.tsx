import React, { useState, useEffect } from "react";
import { CartItem } from "./types"; // Importera CartItem från types.ts
import Checkout from "../checkout/Checkout";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItemsJson = localStorage.getItem("cart") || "[]";
    const parsedCartItems = JSON.parse(cartItemsJson);
    setCartItems(parsedCartItems);
    calculateTotalPrice(parsedCartItems);
  }, []);

  const calculateTotalPrice = (items: CartItem[]) => {
    let total = 0;
    items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleIncrement = (item) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.product.id === item.product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      handleRemove(item);
    } else {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.product.id === item.product.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      calculateTotalPrice(updatedCart);
    }
  };

  const handleRemove = (item) => {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.product.id !== item.product.id
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  return (
    <div>
      <h2>Varukorg</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <div key={cartItem.product.id}>
            <h3>{cartItem.product.name}</h3>
            <img src={cartItem.product.image} alt={cartItem.product.name} />
            <p>Antal: {cartItem.quantity}</p>
            <p>Pris per styck: {cartItem.product.price} kr</p>
            <p>Totalt: {cartItem.product.price * cartItem.quantity} kr</p>
            <button onClick={() => handleIncrement(cartItem)}>+</button>
            <button onClick={() => handleDecrement(cartItem)}>-</button>
            <button onClick={() => handleRemove(cartItem)}>Ta bort</button>
          </div>
        ))}
      </ul>
      <h4>Totalt att betala: {totalPrice} kr</h4>
      <Checkout />
    </div>
  );
}

export default Cart;
