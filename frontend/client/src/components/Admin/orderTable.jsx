import React from "react";
import "./OrderTable.css";

const OrderTable = ({ orders, onUpdate }) => {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Status</th>
          <th>Items</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer_name}</td>
            <td>{order.address}</td>
            <td>{order.status}</td>
            <td>
              <ul>
                {order.CartItems?.map((item, idx) => (
                  <li key={idx}>
                    {item.Product?.name} ({item.quantity}) - R{item.Product?.price}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <button
                className="btn shipped"
                onClick={() => onUpdate(order.id, "Shipped")}
              >
                Mark Shipped
              </button>
              <button
                className="btn delivered"
                onClick={() => onUpdate(order.id, "Delivered")}
              >
                Mark Delivered
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
