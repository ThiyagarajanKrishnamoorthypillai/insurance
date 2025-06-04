import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import imgfolder from "./img/core-img/logo-white.png";

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['agentemail', 'location', 'mobile1']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/agent/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, agent, agentLocation, mobile1 } = response.data;

        localStorage.setItem('token', token);
        axios.defaults.headers.common['x-auth-token'] = token;

        setCookie('agentemail', agent, { path: '/', sameSite: 'Strict' });
        setCookie('location', agentLocation, { path: '/', sameSite: 'Strict' });
        setCookie('mobile1', mobile1, { path: '/', sameSite: 'Strict' });

        alert('Login Successful!');
        setError('');
        navigate('/agent_home');
      } else {
        setError('Login failed. Please check your credentials.');
        alert('Login Unsuccessful!');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Internal Server Error. Please try again later.');
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
            <div className="row justify-content-center"><b>Agent Login</b></div>
            <div className="register-form mt-5 px-4">
              <form onSubmit={handleLogin}>
                <div className="form-group text-start mb-4">
                  <span>Email</span>
                  <label htmlFor="email"><i className="lni lni-user"></i></label>
                  <input className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="info@example.com" />
                </div>

                <div className="form-group text-start mb-4">
                  <span>Password</span>
                  <label htmlFor="password"><i className="lni lni-lock"></i></label>
                  <input className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
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

export default AgentLogin;
