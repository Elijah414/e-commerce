import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import Footer from "../components/layout/footer";


const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Fetch all categories when page loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data))
      .catch(() => toast.error("Failed to load categories."));
  }, []);

  // Fetch products when category is selected
  useEffect(() => {
    if (!selectedCategory) return;
    axios
      .get(`http://localhost:5000/products?categoryId=${selectedCategory.categoryId}`)
      .then((response) => setProducts(response.data))
      .catch(() => toast.error("Failed to load products."));
  }, [selectedCategory]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart.`);
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {/* Dashboard view */}
        {!selectedCategory ? (
          <>
            <h2 className="category-title">Shop by Category</h2>
            <div className="category-grid">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <div
                    key={cat.categoryId}
                    className="category-card"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <img
                      src={`/images/categories/${cat.categoryName.toLowerCase()}.jpg`}
                      alt={cat.categoryName}
                      onError={(e) => {
                        e.target.src = "/images/categories/default.jpg";
                      }}
                    />
                    <h3>{cat.categoryName}</h3>
                  </div>
                ))
              ) : (
                <p>Loading categories...</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/*  Category products view */}
            <button className="back-btn" onClick={() => setSelectedCategory(null)}>
               Categories
            </button>
            <h2 className="category-title">{selectedCategory.categoryName}</h2>

            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p>R{product.price}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                ))
              ) : (
                <p>No products found in this category.</p>
              )}
            </div>
          </>
        )}

        <button className="cart-button" onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
