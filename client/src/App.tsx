import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Confirmation from "./component/Confirmation";
import Header from "./component/Header/Header";
import LoginForm from "./component/Login/LoginForm";
import RegisterForm from "./component/Registerform/RegisterForm";
import Cart from "./component/Cart/Cart";
import { CartContextProvider } from "./Context/CartContext";

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/loginUser" element={<LoginForm />} />
          <Route path="/user/registerUser" element={<RegisterForm />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
