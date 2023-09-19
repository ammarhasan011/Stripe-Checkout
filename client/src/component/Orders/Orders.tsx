import React, { useEffect, useState } from "react";

interface Product {
  product: string;
  quantity: number;
  price: number;
}

interface Order {
  created: number;
  customer: string;
  products: Product[];
  totalAmount: number;
}

interface Props {
  userOrders: Order[];
}

const Orders: React.FC<Props> = ({ userOrders }) => {
  return (
    <div>
      <h1>Tidigare beställningar:</h1>
      <ul>
        {userOrders.map((order, orderIndex) => (
          <li key={orderIndex}>
            <h2>Beställning {orderIndex + 1}</h2>
            <p>Kund: {order.customer}</p>
            <p>Totalt: {order.totalAmount}</p>
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
