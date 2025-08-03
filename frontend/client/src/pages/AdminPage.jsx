import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
  
    axios.get('http://localhost:5000/orders', {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Pass admin token
      },
    })
      .then((response) => setOrders(response.data))
      .catch((error) => {
        console.log(error);
        toast.error('Failed to load orders.');
      });
  }, []);
  
  const updateOrderStatus = (orderId, status) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;
  
    axios.patch(`http://localhost:5000/orders/${orderId}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Admin token again
      },
    })
      .then(() => {
        toast.success('Order status updated');
        setOrders(orders.map(order => (order.id === orderId ? { ...order, status } : order)));
      })
      .catch(() => toast.error('Failed to update status.'));
  };
  

  return (
    <div>
      <h1>Admin - Orders</h1>
      <div className="product-grid"> 
      {orders.map(order => (
  <div key={order.id}>
    <h4>Order ID: {order.id}</h4>
    <p>Status: {order.order_status}</p>
    <p>Customer: {order.customer_name}</p>
    <p>Address: {order.address}</p>
    <h5>Items:</h5>
    <ul>
      {order.CartItems?.map((item, idx) => (
        <li key={idx}>
          {item.Product?.name} - Qty: {item.quantity}, Price: R{item.Product?.price}
        </li>
      ))}
    </ul>
    <button onClick={() => updateOrderStatus(order.id, 'Shipped')}>Mark as Shipped</button>
    <button onClick={() => updateOrderStatus(order.id, 'Delivered')}>Mark as Delivered</button>
  </div>
))}

      
    </div>
    </div>
  );
};

export default AdminPage;
