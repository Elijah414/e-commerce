import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//import "./DriverDashboard.css";

const DriverPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDriverOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/orders/driver", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to load driver orders");
        console.error(err);
      }
    };
    fetchDriverOrders();
  }, [token]);

  const markDelivered = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/orders/${orderId}`, { status: "Delivered" }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order marked as delivered");
      setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: "Delivered" } : o)));
    } catch (err) {
      toast.error("Failed to mark delivered");
    }
  };

  return (
    <div className="driver-dashboard">
      <h2>Your Assigned Orders</h2>
      {orders.length === 0 ? <p>No assigned orders.</p> :
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Address</th><th>Phone</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user?.name}</td>
                <td>{o.address}</td>
                <td>{o.user?.phone}</td>
                <td>{o.status}</td>
                <td>{o.status !== "Delivered" && <button onClick={() => markDelivered(o.id)}>Mark Delivered</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </div>
  );
};

export default DriverPage;
