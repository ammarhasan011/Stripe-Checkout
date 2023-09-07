import RegisterForm from "./registerform/RegisterForm";
import Checkout from "./checkout/Checkout";
import ProductList from "./products/products";

function Home() {
  return (
    <div>
      <Checkout />
      <br />
      <RegisterForm />
      <br />
      <ProductList />
    </div>
  );
}

export default Home;
