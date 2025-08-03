import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: '', address: '' });
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) setToken(storedToken);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          setUser(parsedUser);
        } else {
          throw new Error('Invalid user object in localStorage');
        }
      } catch (err) {
        console.error('Failed to parse user from localStorage:', err);
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      if (token ) {
        try {
          const res = await axios.get('http://localhost:5000/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(res.data);
        } catch (err) {
          toast.error('Failed to load cart');
          console.error(err);
        }
      } else {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
      }
      setLoading(false);
    };

    fetchCart();
  }, [token]);

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    const syncCart = async () => {
      if (token) {
        try {
          await axios.post(
            'http://localhost:5000/cart',
            { items: cart },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (err) {
          console.error('Failed to sync cart:', err);
        }
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    };

    if (cart.length > 0) {
      syncCart();
    }
  }, [cart, token]);

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (!token || !user) {
      alert('Please login first.');
      navigate('/login');
      return;
    }
  
    if (!customer.name || !customer.address) {
      alert('Please fill in your name and address.');
      return;
    }
  
    // Navigate to /checkout and pass customer & cart data
    navigate('/checkout', {
      state: {
        customer,
        cart,
        total,
      },
    });
  };
  

  if (loading) {
    return <div className="cart-container"><p>Loading your cart...</p></div>;
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate('/')}>Go to home</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-grid">
        {cart.map((item, index) => (
          <div key={index} className="cart-card">
            <img
              src={item.image || '/default-image.jpg'}
              alt={item.name}
              className="cart-image"
            />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: R{item.price}</p>
              <p>Subtotal: R{(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeItem(index)} className="remove-btn">
                Remove
              </button>
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
        <input
          type="text"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          placeholder="Residential Address"
        />
      </div>

      {token && user && user.email ? (
        <button onClick={handleCheckout} className="checkout-btn">
          Place Order
        </button>
      ) : (
        <button
          onClick={() => {
            alert('Please login to place your order.');
            navigate('/login');
          }}
          className="checkout-btn"
        >
          Login to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
