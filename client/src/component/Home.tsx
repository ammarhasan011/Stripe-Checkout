import RegisterForm from "./registerform/RegisterForm";
import Checkout from "./checkout/Checkout";
import ProductList from "./products/products";
import LoginForm from "./login/loginForm";

function Home() {
  return (
    <div>
      <Checkout />
      <br />
      <RegisterForm />
      <br />
      <LoginForm />
      <br />
      <ProductList />
    </div>
  );
}

export default Home;
