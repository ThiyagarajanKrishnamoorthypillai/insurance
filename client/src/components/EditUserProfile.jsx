import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const EditUserProfile = () => {
  const { id } = useParams();
  const [editedBin, setEditedBin] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    phone: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBinDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedBin({
            name: data.name || '',
            email: data.email || '',
            password: data.password || '',
            city: data.city || '',
            phone: data.phone || '',
          });
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchBinDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBin((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateBin = async (e) => {
    e.preventDefault();
    try {
      if (!/^\d{10}$/.test(editedBin.phone)) {
        alert('Mobile number must be a 10-digit number');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'x-auth-token': token, // Uncomment if JWT required
        },
        body: JSON.stringify(editedBin),
      });

      if (response.ok) {
        alert('User details updated successfully!');
        window.location.href = "/user_profile";
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div>
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ color: '#020310' }}>
            <img src={imgSmall} alt="" /> <Title />
          </div>
          <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas">
        <button className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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

      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Edit Profile</h6>
            </div>

            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleUpdateBin}>
                    <div className="mb-3">
                      <label className="title mb-2">Name</label>
                      <input className="form-control" name="name" value={editedBin.name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label className="title mb-2">Email</label>
                      <input className="form-control" name="email" value={editedBin.email} disabled />
                    </div>
                    <div className="mb-3">
                      <label className="title mb-2">Password - Leave Blank if no changes</label>
                      <input className="form-control" name="password" value={editedBin.password} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label className="title mb-2">City</label>
                      <input className="form-control" name="city" value={editedBin.city} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                      <label className="title mb-2">Phone</label>
                      <input className="form-control" name="phone" value={editedBin.phone} onChange={handleInputChange} />
                    </div>
                    <button className="btn btn-success w-100" type="submit">Save</button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

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
  );
};

export default EditUserProfile;
