import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import imgfolder from "./img/core-img/logo-white.png";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['adminemail']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['x-auth-token'] = token;

        setCookie('adminemail', email, { path: '/', sameSite: 'Strict' });
        alert('Login Successful!');
        setError('');
        navigate('/admin_home');
      } else {
        setError('Login failed. Please check your credentials.');
        alert('Login Unsuccessful!');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Internal Server Error');
      alert('Login Unsuccessful!');
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="background-shape"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
            <img className="big-logo" src={imgfolder} alt="" />
            <div className="register-form mt-5 px-4">
              <form onSubmit={handleLogin}>
                <div className="form-group text-start mb-4">
                  <span>Email</span>
                  <label htmlFor="email"><i className="lni lni-user"></i></label>
                  <input className="form-control" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@example.com" />
                </div>
                <div className="form-group text-start mb-4">
                  <span>Password</span>
                  <label htmlFor="password"><i className="lni lni-lock"></i></label>
                  <input className="form-control" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>
                <button className="btn btn-warning btn-lg w-100" type="submit">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
