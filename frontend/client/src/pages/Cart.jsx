import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: '', address: '' });
  const [errors, setErrors] = useState({ name: '', address: '' });
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user and token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) setToken(storedToken);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          setUser(parsedUser);
        } else throw new Error('Invalid user object');
      } catch {
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  // Load cart
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(res.data);
        } catch {
          toast.error('Failed to load cart');
        }
      } else {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
      }
      setLoading(false);
    };
    fetchCart();
  }, [token]);

  // Calculate total
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  // Sync cart
  useEffect(() => {
    const syncCart = async () => {
      if (token) {
        try {
          await axios.post(
            'http://localhost:5000/cart',
            { items: cart },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch { console.error('Failed to sync cart'); }
      } else localStorage.setItem('cart', JSON.stringify(cart));
    };
    if (cart.length > 0) syncCart();
  }, [cart, token]);

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = { name: '', address: '' };
    let isValid = true;

    if (!customer.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(customer.name.trim())) {
      newErrors.name = 'Name can only contain letters';
      isValid = false;
    }

    if (!customer.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    } else if (customer.address.trim().length < 5) {
      newErrors.address = 'Address is too short';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCheckout = () => {
    if (!token || !user) {
      toast.error('Please login first.');
      navigate('/login');
      return;
    }

    if (!validateForm()) return;

    navigate('/checkout', { state: { customer, cart, total } });
  };

  if (loading) return <div className="cart-container"><p>Loading your cart...</p></div>;
  if (cart.length === 0)
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate('/')}>Go to home</button>
      </div>
    );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-grid">
        {cart.map((item, index) => (
          <div key={index} className="cart-card">
            <img src={item.image || '/default-image.jpg'} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: R{item.price}</p>
              <p>Subtotal: R{(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeItem(index)} className="remove-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="total-section">
        <h2>Total: R{total.toFixed(2)}</h2>
      </div>

      <div className="customer-info">
        <input
          type="text"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          placeholder="Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="text"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          placeholder="Residential Address"
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>

      <button onClick={handleCheckout} className="checkout-btn">
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
