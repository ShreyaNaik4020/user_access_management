import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/Form.css";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(res.data);
    } catch (err) {
      alert("Error fetching requests");
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${id}`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(`Request ${action}`);
      fetchRequests(); // Refresh
    } catch (err) {
      alert("Error updating request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="form-container">
      <h2>Pending Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map((r) => (
          <div key={r.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <p><strong>User:</strong> {r.user.username}</p>
            <p><strong>Software:</strong> {r.software.name}</p>
            <p><strong>Access Type:</strong> {r.accessType}</p>
            <p><strong>Reason:</strong> {r.reason}</p>
            <button onClick={() => handleAction(r.id, "Approved")} style={{ marginRight: "10px" }}>
              Approve
            </button>
            <button onClick={() => handleAction(r.id, "Rejected")}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingRequests;