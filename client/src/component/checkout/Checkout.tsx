import { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";

function Checkout() {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
  async function handlePayment() {
    try {
      const response = await fetch(
        "http://localhost:3000/checkout/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems }),
        }
      );

      if (!response.ok) {
        console.error("Begäran misslyckades");
        return;
      }

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }
  }

  return (
    <>
      <button onClick={handlePayment}>Betala</button>
    </>
  );
}

export default Checkout;
