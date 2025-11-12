import React, { useState } from "react";
import {
  FaBox,
  FaTruck,
  FaBoxes,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ onFilterChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="sidebar">
      <div>
        <img id="img" alt="Company Logo" src="C:\Users\ACER\Desktop\ff\frontend\client\src\assets\images\fastDeliveryLogo.png" />
      <h2 className="logo">FastDelivery</h2>
      </div>
      <ul>
        <li
          className="dropdown"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaBox /> Orders ▾
        </li>
        {showDropdown && (
          <ul className="dropdown-list">
            <li onClick={() => onFilterChange("All")}>All Orders</li>
            <li onClick={() => onFilterChange("Pending")}>Pending</li>
            <li onClick={() => onFilterChange("Packaged")}>Packaged</li>
            <li onClick={() => onFilterChange("Ready for Delivery")}>
              Ready for Delivery
            </li>
            <li onClick={() => onFilterChange("Delivered")}>Delivered</li>
          </ul>
        )}
        <li onClick={() => onFilterChange("Drivers")}>
          <FaTruck /> Drivers
        </li>
        <li onClick={() => onFilterChange("Packers")}>
          <FaBoxes /> Packers
        </li>
        <li onClick={() => onFilterChange("Customers")}>
          <FaUsers /> Customers
        </li>
        <li onClick={() => onFilterChange("Reports")}>
          <FaChartBar /> Reports
        </li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
