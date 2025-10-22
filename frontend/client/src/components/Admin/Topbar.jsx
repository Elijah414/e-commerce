import React from "react";
import "./Topbar.css";

const Topbar = () => {
  const adminName = localStorage.getItem("adminName") || "Admin";

  return (
    <div className="topbar">
      <h3>Welcome, {adminName}</h3>
    </div>
  );
};

export default Topbar;
