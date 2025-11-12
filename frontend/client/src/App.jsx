import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/Cart.jsx';
import LoginPage from './pages/Login.jsx';
import AdminLogin from './pages/AdminiLogin.jsx';
import AdminPage from './pages/AdminPage.jsx';
import DriverPage from './pages/DriverPage.jsx';
import PackerPage from './pages/PackerPage.jsx';
import CheckoutPage from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import { ToastContainer } from 'react-toastify';
import './App.css';

// Role-based private route
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !role) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/login" element={<AdminLogin />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Role-based Routes */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminPage />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/driver" 
            element={
              <PrivateRoute allowedRoles={['driver']}>
                <DriverPage />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/packer" 
            element={
              <PrivateRoute allowedRoles={['packer']}>
                <PackerPage />
              </PrivateRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
