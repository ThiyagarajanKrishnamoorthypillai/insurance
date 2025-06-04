import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const UpdatePlanAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    planName: '',
    type: '',
    coverage: '',
    exclusions: '',
    premium: '',
    validity: '',
    eligibility: '',
    addOns: '',
    vehicleType: '',
    isActive: true,
    adminemail: ''
  });

  // GET Plan Data by ID
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/plan/${id}`);
        if (response.status === 200) {
          const plan = response.data;
          setFormData({
            ...plan,
            addOns: plan.addOns.join(', ')
          });
        }
      } catch (error) {
        console.error('Error fetching plan:', error.message);
      }
    };
    fetchPlan();
  }, [id]);

  // Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  // PUT Plan Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/v1/plan/${id}`, {
        ...formData,
        addOns: formData.addOns.split(',').map(a => a.trim())
      });
      alert("Plan updated successfully!");
      navigate("/view_insurance_plan_admin");
    } catch (error) {
      console.error("Error updating plan:", error.message);
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

      {/* Main Form */}
      <div className="page-content-wrapper">
        <div className="container py-4">
          <h5 className="mb-4">Update Insurance Plan</h5>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Plan Name</label>
              <input type="text" className="form-control" name="planName" value={formData.planName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Type</label>
              <input type="text" className="form-control" name="type" value={formData.type} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Coverage</label>
              <input type="text" className="form-control" name="coverage" value={formData.coverage} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Exclusions</label>
              <input type="text" className="form-control" name="exclusions" value={formData.exclusions} onChange={handleChange} placeholder="e.g., not applicable for theft" />
            </div>

            <div className="mb-3">
              <label>Premium</label>
              <input type="number" className="form-control" name="premium" value={formData.premium} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label>Validity</label>
              <input type="text" className="form-control" name="validity" value={formData.validity} onChange={handleChange} placeholder="e.g., 1 Year / 6 Months" />
            </div>

            <div className="mb-3">
              <label>Eligibility</label>
              <input type="text" className="form-control" name="eligibility" value={formData.eligibility} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>Add-Ons (comma-separated)</label>
              <input type="text" className="form-control" name="addOns" value={formData.addOns} onChange={handleChange} placeholder="e.g., Roadside Assistance, Engine Protection" />
            </div>

            <div className="mb-3">
              <label>Vehicle Type</label>
              <input type="text" className="form-control" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
              <label className="form-check-label">Is Active</label>
            </div>

            <button type="submit" className="btn btn-success">Update Plan</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              <li><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlanAdmin;
