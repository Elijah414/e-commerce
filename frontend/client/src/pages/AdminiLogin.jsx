import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminiLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });

      const { token, role } = res.data;
      if (!['admin', 'driver', 'packer'].includes(role)) {
        toast.error('Only admins, drivers, and packers can log in here.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      toast.success(`${role} login successful!`);

      if (role === 'admin') navigate('/admin');
      else if (role === 'driver') navigate('/driver');
      else if (role === 'packer') navigate('/packer');

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin / Staff Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
