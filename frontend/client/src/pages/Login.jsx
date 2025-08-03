import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import './LoginPage.css'

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    contact: '',
  });

  const { login } = useContext(CartContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password ||
      (isRegister && (!form.firstname || !form.lastname || !form.contact))) {
      toast.warn('Please fill in all fields.');
      return;
    }

    const url = isRegister
      ? 'http://localhost:5000/auth/register'
      : 'http://localhost:5000/auth/login';

    try {
      const response = await axios.post(url, form);
      const { token, user } = response.data;

      if (token && user) {
        login(token, user); // sets token, user and syncs cart
        toast.success(isRegister ? 'Registered!' : 'Logged in!');
        window.location.href = '/';
      } else {
        toast.error('No token or user in response.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Auth failed');
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} />
            <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} />
            <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
          </>
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegister ? 'Already have an account?' : 'No account?'}{' '}
        <button type="button" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Login' : 'Register'}</button>
      </p>
    </div>
  );
};

export default LoginPage;
