import axios from "axios";
import React, { useState, ChangeEvent } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/registerUser",
        formData
      );
      // console.log("Registration succeeded:", response.data.message);

      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setRegistrationMessage("Registreringen lyckades!");

      setTimeout(() => {
        setRegistrationMessage("");
      }, 4000);
    } catch (error: any) {
      console.error("Registration failed:", error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrera dig</h2>
      {registrationMessage && <p>{registrationMessage}</p>}
      <label>
        Användernamn:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </label>

      <br />
      <label>
        E-postadress:
        <input
          type="email"
          name="email"
          value={formData.email}
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
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Registrera</button>
      </label>
    </form>
  );
}

export default RegisterForm;
