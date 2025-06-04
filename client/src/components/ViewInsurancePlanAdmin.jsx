import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgMech from "./img/mechanic.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewInsurancePlanAdmin = () => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
const response = await axios.get(`${import.meta.env.VITE_API_URL}/plan/`);
              if (response.status === 200) setPlanData(response.data);
        else console.error('Error fetching plan data:', response.statusText);
      } catch (error) {
        console.error('Error fetching plan data:', error.message);
      }
    };
    fetchPlanData();
  }, []);

  const filteredData = planData.filter((plan) =>
    Object.values(plan).some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (id) => {
    navigate(`/update_plan_admin/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Do you want to remove?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${import.meta.env.VITE_API_URL}/plan/${id}`, {
          headers: { 'x-auth-token': token },
        });
        alert('Removed successfully.');
        setPlanData(planData.filter(p => p._id !== id));
      } catch (err) {
        console.error('Delete error:', err.message);
      }
    }
  };

  const timeOptions = { hour: '2-digit', minute: '2-digit' };

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

      {/* Sidebar */}
      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas">
        <button className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile">
            <div className="user-profile"><img src={imgBg} alt=""/></div>
            <div className="user-info">
              <h6 className="user-name mb-1">Web Based Vehicle Insurance Management System</h6>
            </div>
          </div>
          <ul className="sidenav-nav ps-0">
            <li><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>View Insurance Plan's Details</h6>
            </div>
            <div className="row g-3">
              <div className="top-search-form">
                <form>
                  <input className="form-control" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="row mt-3">
              {filteredData.map((plan) => (
              <div key={plan._id} className="col-12 col-md-6">
  <div className="card product-card mb-3">
    <div className="card-body">
      <h6><b>Plan Name:</b> {plan.planName}</h6>
      <p><b>Type:</b> {plan.type}</p>
      <p><b>Coverage:</b> {plan.coverage}</p>
      <p><b>Exclusions:</b> {plan.exclusions}</p>
      <p><b>Premium:</b> ₹{plan.premium}</p>
      <p><b>Validity:</b> {plan.validity}</p>
      <p><b>Eligibility:</b> {plan.eligibility}</p>
      <p><b>Add-Ons:</b> {plan.addOns.join(', ')}</p>
      <p><b>Vehicle Type:</b> {plan.vehicleType}</p>
      <p><b>Created On:</b> {new Date(plan.dateCreated).toLocaleDateString('en-GB', timeOptions)}</p>
    </div>
  </div>

  {/* Separated Buttons Below Card */}
  <div className="d-flex justify-content-between mb-4">
    <button className="btn btn-outline-primary w-50 me-2" onClick={() => handleEdit(plan._id)}>
      ✏️ Update
    </button>
    <button className="btn btn-outline-danger w-50" onClick={() => handleDelete(plan._id)}>
      🗑️ Delete
    </button>
  </div>
</div>

              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active"><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
                <li><Logout /></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewInsurancePlanAdmin;
