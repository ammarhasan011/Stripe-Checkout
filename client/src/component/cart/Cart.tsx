import React, { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  //   function addToCart(product: { name: string; price: number }) {
  //     setCartItems([...cartItems, product]);
  //   }

  function removeFromCart(index: number) {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  }

  return (
    <div>
      {cartItems.map((item, index) => (
        <div key={index}>
          <span>{item.name}</span>
          <span>{item.price}</span>
          <div>
            <button onClick={() => removeFromCart(index)}>Ta bort</button>
            {/* <button
              onClick={() => addToCart({ name: "Produktnamn", price: 10 })}
            >
              lägg till i varukorg
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}
// console.log(Cart);

export default Cart;
