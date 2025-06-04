import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import Cookies from 'js-cookie';


const PostFeedbackUser = () => {
  const userEmail = Cookies.get('email');

  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
    location: '',
    email: userEmail || ''
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/location`);
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    };

    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem('token') || ''
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Feedback submitted successfully!");
        window.location.href = "/user_home";
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ color: '#020310' }}>
            <img src={imgSmall} alt="" /> <Title />
          </div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      {/* Offcanvas */}
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
            <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      {/* Main Form */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6 className="text-primary">Post Feedback</h6>
            </div>

            <div className="card user-data-card shadow-sm">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="row g-3">

                  <div className="col-12">
                    <label className="form-label text-dark fw-bold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label text-dark fw-bold">Feedback</label>
                    <textarea
                      className="form-control"
                      name="feedback"
                      rows="3"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label text-dark fw-bold">Select Location</label>
                    <select
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select Location --</option>
                      {locations.map((location) => (
                        <option key={location._id} value={location.location}>
                          {location.location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-dark fw-bold">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      readOnly
                    />
                  </div>

                  <div className="col-12 d-grid mt-3">
                    <button className="btn btn-success" type="submit">Submit Feedback</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active"><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
                <li><Logout /></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostFeedbackUser;
