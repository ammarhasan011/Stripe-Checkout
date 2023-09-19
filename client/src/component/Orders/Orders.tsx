import { useEffect, useState } from "react";

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/orders/getAllOrders/123"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserOrders(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Tidigare beställningar:</h1>
      <ul>
        {userOrders.map((order, orderIndex) => (
          <li key={orderIndex}>
            <h2>Beställning {orderIndex + 1}</h2>
            <p>Kund: {order.customer}</p>
            <p>Totalt pris: {order.totalAmount}</p>
            <h3>Produkter:</h3>
            <ul>
              {order.products.map((product, productIndex) => (
                <li key={productIndex}>
                  <p>Produkt: {product.product}</p>
                  <p>Antal: {product.quantity}</p>
                  <p>Pris: {product.price}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
