import React, { useState } from "react"
import "./../styles/Form.css"
import axios from "axios"

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful!");
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" value={form.username} onChange={handleChange} placeholder="Username"
        />
        <input name="password" type="password"  value={form.password} onChange={handleChange} placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup;