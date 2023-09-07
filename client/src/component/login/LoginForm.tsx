import axios from "axios";
import React, { useState, ChangeEvent } from "react";

function LoginForm() {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState("");

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
      const response = await axios.post(
        "http://localhost:3000/user/loginUser",
        FormData
      );
      console.log("login succeeded", response.data.message);

      setFormData({
        username: "",
        password: "",
      });
      setRegistrationMessage("Du loggade in!");

      setTimeout(() => {
        setRegistrationMessage("");
      }, 4000);
    } catch (error: any) {
      console.log("Login failed", error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>login</h2>
      {registrationMessage && <p>{registrationMessage}</p>}
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
  );
}

export default LoginForm;
