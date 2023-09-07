import React, { useState, ChangeEvent } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registreringsdata:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrera dig</h2>

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
