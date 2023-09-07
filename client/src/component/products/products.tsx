import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/getAllProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} />
            <p>Pris: {product.price} kr</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
