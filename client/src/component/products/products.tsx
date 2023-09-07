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
  const [cartItems, setCartItems] = useState<any[]>([]);
  console.log(cartItems);

  function addToCart(product: Product) {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId: string) {
    const updatedCartItems = cartItems.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems.filter((item) => item.quantity > 0));
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
            <button onClick={() => removeFromCart(product.id)}>Ta bort</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
