import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularIndeterminate from "../Loading/Loading";
import MultiActionAreaCard from "../Cards/Cards"; // Uppdatera sökvägen till din MultiActionAreaCard-komponent

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <div className="card-container">
          {products.map((product) => (
            <MultiActionAreaCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
