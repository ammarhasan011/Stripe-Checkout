function Confirmation() {
  return <div>tack för ditt köp</div>;
}

export default Confirmation;

// import { useEffect, useState } from "react";

// function Confirmation() {
//   const [isPaymentVerified, setIsPaymentVerified] = useState(false);

//   useEffect(() => {
//     const session;

//     const verifyPayment = async () => {
//       const response = await fetch("http://localhost:3000/verify-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cart),
//       });
//     };
//   });

//   return isPaymentVerified ? (
//     <h1>Tack för ditt köp</h1>
//   ) : (
//     <h2>Något gick fel med betalningen</h2>
//   );
// }

// export default Confirmation;
