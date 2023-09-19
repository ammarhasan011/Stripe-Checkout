import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import Orders from "../Orders/Orders";

function LoginForm() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setloginMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/loginUser", FormData);
      console.log("login succeeded", response.data.message);

      setFormData({
        username: "",
        password: "",
      });
      setloginMessage("Du loggade in!");

      setTimeout(() => {
        setloginMessage("");
      }, 4000);
    } catch (error: any) {
      console.log("Login failed", error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>login</h2>
        {loginMessage && <p>{loginMessage}</p>}
        <label>
          Användernamn:
          <input
            type="text"
            name="username"
            value={FormData.username}
            onChange={handleInputChange}
            required
          />
        </label>

        <br />
        <label>
          Lösenord:
          <input
            type="text"
            name="password"
            value={FormData.password}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit">Logga in</button>
        </label>
      </form>
      <Orders />
    </>
  );
}

export default LoginForm;
