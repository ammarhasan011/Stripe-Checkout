import { useState } from "react";

function Checkout() {
  const [cartItems, setCartItems] = useState([
    { product: "price_1NnKkQHGDNbcqHddO65c8zUb", quantity: 2 },
  ]);

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
