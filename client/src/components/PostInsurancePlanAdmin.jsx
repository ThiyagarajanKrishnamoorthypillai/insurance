import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import Cookies from 'js-cookie';

// name  Agentname mechanicname service available  locality address city mobile 

const PostInsurancePlanAdmin = () => {
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
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
const adminEmail = Cookies.get('adminemail');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/plan/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ ...formData, adminemail: adminEmail }),
      });

      if (response.ok) {
        alert('Insurance Plan Created Successfully');
        window.location.href = "/admin_home";
      } else {
        console.error('Failed to create plan');
      }
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

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
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h4><strong>Insurance Register</strong></h4>
          </div>
        <div className="container mt-4">
      <h4><strong>Create Insurance Plan</strong></h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
  <label>Plan Name</label>
  <select
    name="planName"
    className="form-control"
    value={formData.planName}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Plan Name</option>
    <option value="Third-Party Liability Insurance">Third-Party Liability Insurance</option>
    <option value="Comprehensive Insurance">Comprehensive Insurance</option>
    <option value="Zero Depreciation Plan">Zero Depreciation Plan</option>
    <option value="Personal Accident Cover">Personal Accident Cover</option>
    <option value="Engine Protection Plan">Engine Protection Plan</option>
    <option value="Return to Invoice Cover">Return to Invoice Cover</option>
    <option value="No Claim Bonus (NCB) Protector">No Claim Bonus (NCB) Protector</option>
    <option value="Roadside Assistance Plan">Roadside Assistance Plan</option>
  </select>
</div>

        <div className="mb-3">
          <label>Type</label>
          <select name="type" className="form-control" value={formData.type} onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <option>Third-Party</option>
            <option>Comprehensive</option>
            <option>Add-on</option>
            <option>Corporate</option>
          </select>
        </div>
   <div className="mb-3">
  <label>Coverage</label>
  <textarea
    name="coverage"
    className="form-control"
    value={formData.coverage}
    onChange={handleInputChange}
    placeholder="e.g., *Water ingression, oil leakage, hydrostatic lock* | *Damage to third-party vehicle/property, injury/death of third-party*"
    style={{ fontStyle: formData.coverage === '' ? 'italic' : 'normal', height:'150px' }}
    required 
  ></textarea>
</div>


        <div className="mb-3">
  <label>Exclusions(optional)</label>
  <input
    type="text"
    name="exclusions"
    className="form-control"
    value={formData.exclusions}
    onChange={handleInputChange}
    placeholder="e.g., Does not cover own vehicle damage or theft"
  />
</div>
        <div className="mb-3">
          <label>Premium (INR)</label>
          <input type="number" name="premium" className="form-control" value={formData.premium} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
  <label>Validity</label>
  <input
    type="text"
    name="validity"
    className="form-control"
    value={formData.validity}
    onChange={handleInputChange}
    placeholder="e.g., 1 Year / 6 Months / 5 Years"
  />
</div>

<div className="mb-3">
  <label>Eligibility</label>
  <input
    type="text"
    name="eligibility"
    className="form-control"
    value={formData.eligibility}
    onChange={handleInputChange}
    placeholder="e.g., Available for cars under 5 years only"
  />
</div>

<div className="mb-3">
  <label>Add-Ons (comma-separated)</label>
  <input
    type="text"
    name="addOns"
    className="form-control"
    value={formData.addOns}
    onChange={handleInputChange}
    placeholder="e.g., Engine Protection, NCB Shield, Roadside Assistance"
  />
</div>
        <div className="mb-3">
          <label>Vehicle Type</label>
          <select name="vehicleType" className="form-control" value={formData.vehicleType} onChange={handleInputChange} required>
            <option value="">Select Vehicle Type</option>
            <option>Bike</option>
            <option>Car</option>
            <option>Commercial</option>
            <option>All</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" name="isActive" className="form-check-input" checked={formData.isActive} onChange={handleInputChange} />
          <label className="form-check-label">Active</label>
        </div>
        <button className="btn btn-success w-100" type="submit">Create Plan</button>
      </form>
    </div>
 

        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/admin_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default PostInsurancePlanAdmin