import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//import "./PackerDashboard.css";

const PackerPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPackerOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/orders/packer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to load packer orders");
        console.error(err);
      }
    };
    fetchPackerOrders();
  }, [token]);

  return (
    <div className="packer-dashboard">
      <h2>Your Assigned Orders</h2>
      {orders.length === 0 ? <p>No assigned orders.</p> :
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Address</th><th>Phone</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user?.name}</td>
                <td>{o.address}</td>
                <td>{o.user?.phone}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </div>
  );
};

export default PackerPage;
