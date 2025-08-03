import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/Cart.jsx';
import LoginPage from './pages/Login.jsx';
import AdminPage from './pages/AdminPage.jsx';
import CheckoutPage from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import AdminLogin from './pages/AdminiLogin';
import { ToastContainer } from 'react-toastify';
import './App.css'




function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
