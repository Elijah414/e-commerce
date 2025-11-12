import React, { useState } from "react";
import Sidebar from "./sidebar";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSelectStatus = async (status) => {
    setSelectedStatus(status);
    try {
      const res = await fetch(`http://localhost:5000/api/orders?status=${status}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        handleLogout={() => console.log("Logged out")}
        onSelectStatus={handleSelectStatus}
      />

      <div className="main-content">
        <h2>
          {selectedStatus
            ? `${selectedStatus} Orders`
            : "Select a category to view orders"}
        </h2>

        <div className="orders-list">
          {orders.length === 0 && selectedStatus ? (
            <p>No {selectedStatus.toLowerCase()} orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <h4>Order ID: {order.id}</h4>
                <p>Customer: {order.customerName}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
