import React, { useState, useEffect } from "react"
import axios from "axios"
import "./../styles/Form.css"

const RequestAccess = () => {
  const [softwares, setSoftwares] = useState([])
  const [form, setForm] = useState({
    softwareId: "",
    accessType: "",
    reason: "",
  });

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/software", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSoftwares(res.data);
      } catch (err) {
        console.error("Error fetching software list");
      }
    };

    fetchSoftwares();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/requests",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Request submitted!");
      setForm({ softwareId: "", accessType: "", reason: "" })
    } catch (err) {
      alert("Failed to submit request")
    }
  };

  return (
    <div className="form-container">
      <h2>Request Access</h2>
      <form onSubmit={handleSubmit}>
        <select name="softwareId" value={form.softwareId} onChange={handleChange}>
          <option value="">Select Software</option>
          {softwares.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          name="accessType"
          value={form.accessType}
          onChange={handleChange}
          placeholder="Access Type (Read/Write/Admin)"
        />

        <input
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason for Access"
        />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestAccess;