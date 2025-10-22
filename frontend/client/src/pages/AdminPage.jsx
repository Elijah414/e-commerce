import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Admin/sidebar";
import Topbar from "../components/Admin/Topbar";
import OrderTable from "../components/Admin/orderTable";
import "./AdminDashboard.css";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    axios
      .get("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load orders.");
        setLoading(false);
      });
  }, []);

  const updateOrderStatus = (orderId, status) => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    axios
      .patch(
        `http://localhost:5000/orders/${orderId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast.success("Order status updated");
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
      })
      .catch(() => toast.error("Failed to update status."));
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content">
          <h2>Orders Overview</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <OrderTable orders={orders} onUpdate={updateOrderStatus} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
