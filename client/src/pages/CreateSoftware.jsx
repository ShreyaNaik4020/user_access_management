import React, { useState } from "react"
import axios from "axios"
import "./../styles/Form.css"

const CreateSoftware = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    accessLevels: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/software",
        {
          name: form.name,
          description: form.description,
          accessLevels: form.accessLevels.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Software created!");
      setForm({ name: "", description: "", accessLevels: "" })
    } catch (err) {
      alert("Failed to create software")
    }
  };

  return (
    <div className="form-container">
      <h2>Create Software</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Software Name"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="accessLevels"
          value={form.accessLevels}
          onChange={handleChange}
          placeholder="Access Levels (comma-separated, e.g. Read,Write,Admin)"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateSoftware;