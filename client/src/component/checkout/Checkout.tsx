import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";

function Checkout() {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);

  const [customerId, setCustomerId] = useState("");

  async function handlePayment() {
    try {
      const response = await fetch(
        "/checkout/create-checkout-session",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            customerId,
          }),
        }
      );
      if (!response.ok) {
        console.error("Begäran misslyckades");
        return;
      }

      const { url, sessionId } = await response.json();
      localStorage.setItem("session-id", sessionId);
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
