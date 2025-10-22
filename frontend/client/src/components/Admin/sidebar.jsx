import React from "react";
import { FaBox, FaUsers, FaTruck, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin-login";
  };

  return (
    <div className="sidebar">
      <h2 className="logo">FastDelivery</h2>
      <ul>
        <li><FaBox /> Orders</li>
        <li><FaTruck /> Drivers</li>
        <li><FaUsers /> Customers</li>
        <li><FaChartBar /> Reports</li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
