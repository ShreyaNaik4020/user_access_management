import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CreateSoftware from "./pages/CreateSoftware"
import RequestAccess from "./pages/RequestAccess"
import PendingRequests from "./pages/PendingRequests"
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createSoftware" element={<CreateSoftware />} />
        <Route path="/requestaccess" element={<RequestAccess />} />  
        <Route path="/pendingrequests" element={<PendingRequests />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;