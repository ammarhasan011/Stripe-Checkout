import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}
interface CartItem {
  product: Product;
  quantity: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  function addToCart(product: Product) {
    const existingCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = existingCartItems.find(
      (item: any) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      existingCartItems.push({ product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCartItems));
  }

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
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} />
            <p>Pris: {product.price} kr</p>
            <button onClick={() => addToCart(product)}>
              Lägg till i varukorg
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
