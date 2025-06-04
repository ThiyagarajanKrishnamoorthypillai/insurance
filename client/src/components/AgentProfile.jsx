import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const AgentProfile = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [cookies] = useCookies(['agentemail']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/agent/`);
        const data = await res.json();

        const agentEmail = cookies.agentemail;
        const filtered = data.filter((agent) => agent.email === agentEmail);
        setFilteredData(filtered);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };

    fetchAgentData();
  }, [cookies]);

  return (
    <div>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ color: '#020310' }}>
            <img src={imgSmall} alt="" /> <Title />
          </div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas">
        <button className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile">
            <div className="user-profile"><img src={imgBg} alt="" /></div>
            <div className="user-info">
              <h6 className="user-name mb-1">Web Based Vehicle Insurance Management System</h6>
            </div>
          </div>
          <ul className="sidenav-nav ps-0">
            <li><Link to="/agent_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Agent Profile</h6>
            </div>

            <div className="row mt-3">
              {filteredData.map((agent) => (
                <div key={agent._id} className="col-12 col-md-6">
                  <div className="card product-card mb-3">
                    <div className="card-body">
                      <p className="product-title d-block">Name: <b>{agent.name}</b></p>
                      <p className="product-title d-block">Email: <b>{agent.email}</b></p>
                      <p className="product-title d-block">Mobile: {agent.mobile}</p>
                      <p className="product-title d-block">City: {agent.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active"><Link to="/agent_home"><i className="lni lni-home"></i>Home</Link></li>
                <li><Logout /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
