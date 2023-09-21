import { useState, useEffect } from "react";

function Confirmation() {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem("session-id");
      const response = await fetch(
        "http://localhost:3000/verify/verify-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        }
      );

      const { verified } = await response.json();

      if (verified) {
        setIsPaymentVerified(true);
        localStorage.removeItem("session-id");
      } else {
        setIsPaymentVerified(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return isPaymentVerified ? (
    <div>
      <h1>Tack för ditt köp</h1>
    </div>
  ) : (
    <h2>Något gick fel med betalningen</h2>
  );
}

export default Confirmation;
