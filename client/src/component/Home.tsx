import RegisterForm from "./registerform/RegisterForm";
import Checkout from "./checkout/Checkout";
import ProductList from "./products/products";
import LoginForm from "./login/LoginForm";
import Cart from "./cart/Cart";
// import Header from "./Header/Header";

function Home() {
  return (
    <div>
      {/* <Header /> */}
      <br />
      <Checkout />
      <br />

      <RegisterForm />
      <br />
      <LoginForm />
      <br />
      <ProductList />
      <br />
      <Cart />
    </div>
  );
}

export default Home;
