import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.log(error);
        toast.error('Failed to load products.');
      });
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} added to cart.`);
  };

  return (
    <div>
      <Navbar />

      <div className="home-container">
        
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>R{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <button className="cart-button" onClick={() => navigate('/cart')}>Go to Cart</button>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
