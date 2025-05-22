import { useNavigate } from "react-router-dom"
import React from "react"

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#f5f5f5", marginBottom: "20px" }}>
      {role === "Admin" && <a href="/create-software">Create Software</a>}
      {role === "Employee" && <a href="/request-access">Request Access</a>}
      {role === "Manager" && <a href="/pending-requests">Pending Requests</a>}
      <span style={{ float: "right", cursor: "pointer" }} onClick={handleLogout}>
        Logout
      </span>
    </nav>
  );
};

export default Navbar;