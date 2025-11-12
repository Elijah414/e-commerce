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
  const [filter, setFilter] = useState("All"); // current filter
  const token = localStorage.getItem("adminToken");

  // Fetch orders with optional status filter
  const fetchOrders = async (status) => {
    if (!token) return;
    setLoading(true);

    try {
      const url =
        status && status !== "All"
          ? `http://localhost:5000/orders?status=${status}`
          : `http://localhost:5000/orders`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(filter);
  }, [filter]);

  // 🔹 Update order status
  const updateOrderStatus = async (orderId, status) => {
    if (!token) return;

    try {
      await axios.patch(
        `http://localhost:5000/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order status updated");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    } catch (err) {
      toast.error("Failed to update status.");
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar now supports filter callback */}
      <Sidebar onFilterChange={setFilter} />

      <div className="main-content">
        <Topbar />
        <div className="content">
          <h2>
            {filter === "All" ? "All Orders Overview" : `${filter} Orders`}
          </h2>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found for this category.</p>
          ) : (
            <OrderTable
              orders={orders}
              onUpdate={updateOrderStatus}
              showDriver
              showPacker
              showCustomer
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
