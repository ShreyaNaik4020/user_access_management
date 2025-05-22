import React, { useState } from "react"
import "./../styles/Form.css"
import axios from "axios"

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const role = res.data.role;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      alert("Login successful!");
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Login failed.")
    }
  }
  if (role === "Admin") {
  window.location.href = "/create-software";
} else if (role === "Employee") {
  window.location.href = "/request-access";
} else if (role === "Manager") {
  window.location.href = "/pending-requests";
} else {
  window.location.href = "/";
}

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username"
        />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;