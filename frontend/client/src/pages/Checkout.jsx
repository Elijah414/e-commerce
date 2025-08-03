import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer, cart, total } = location.state || {};

  const token = localStorage.getItem('token');

  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        'http://localhost:5000/orders',
        {
          customer_name: customer.name,
          address: customer.address,
          items: cart,
          payment_method: 'Cash on Delivery', 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Order placed successfully!');
      localStorage.removeItem('cart');
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Order failed:', error.response?.data || error.message);
      toast.error('Failed to place order.');
    }
  };

  if (!customer || !cart) {
    return <p>Missing order details.</p>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Address:</strong> {customer.address}</p>

      <h2>Order Summary:</h2>
      {cart.map((item, idx) => (
        <div key={idx}>
          <p>{item.name} x {item.quantity} = R{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <h3>Total: R{total.toFixed(2)}</h3>

      <h2>Payment Method:</h2>
      <div>
        <input type="radio" id="cod" name="paymentMethod" value="cod" checked readOnly />
        <label htmlFor="cod">Cash on Delivery</label>
        <br />
        <small style={{ color: 'gray' }}>Only Cash on Delivery is available at the moment.</small>
      </div>

      <button onClick={handlePlaceOrder} className="checkout-btn">
        Confirm and Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
