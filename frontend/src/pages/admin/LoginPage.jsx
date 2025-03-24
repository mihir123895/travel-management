// LoginPage.js

import React, { useContext, useState } from 'react';
import './LoginPage.css';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {backendUrl,setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const {data} = await axios.post(`${backendUrl}/api/v1/tours/login-admin`,{email,password})

      console.log(data)
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);

        navigate('/admin')


      } else {
        toast.error("invalide creadiantials");
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
