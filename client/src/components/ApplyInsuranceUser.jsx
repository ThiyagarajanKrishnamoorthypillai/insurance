import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ApplyInsuranceUser = () => {
  const navigate = useNavigate();
  const { state: planData } = useLocation();

  const [locations, setLocations] = useState([]);
const [vehiclePhotos, setVehiclePhotos] = useState([]);

  const [userData, setUserData] = useState({
    name: '',
    email: Cookies.get("email") || '',
    vehicleNo: '',
    address: '',
    mobile: '',
    location: ''
  });

  // Fetch Location options from Location collection
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/location");
        setLocations(res.data);
      } catch (err) {
        console.error("Error loading locations:", err);
      }
    };

    if (!planData?.planName) {
      alert('No plan selected');
      navigate('/view_insurance_user');
    } else {
      fetchLocations();
    }
  }, [planData, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setVehiclePhoto(e.target.files[0]);
  };

  const handleApply = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Plan Details from planData (passed via useLocation)
  formData.append("planName", planData.planName);
  formData.append("type", planData.type);
  formData.append("coverage", planData.coverage);
  formData.append("exclusions", planData.exclusions);
  formData.append("premium", planData.premium);
  formData.append("validity", planData.validity);
  formData.append("eligibility", planData.eligibility);
  formData.append("addOns", JSON.stringify(planData.addOns));
  formData.append("vehicleType", planData.vehicleType);
  formData.append("planDateCreated", planData.dateCreated); // original Plan creation date
  formData.append("insuranceDateCreated", new Date().toISOString()); // new application date
  formData.append("status", "Pending"); // default status

  // User Data
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  formData.append("vehicleNo", userData.vehicleNo);
  formData.append("address", userData.address);
  formData.append("mobile", userData.mobile);
  formData.append("location", userData.location);

  // Images (multiple)
  vehiclePhotos.forEach((photo) => {
    formData.append("vehiclePhotos", photo); // backend must support .array("vehiclePhotos")
  });

  try {
    const res = await axios.post("http://localhost:4000/api/v1/insurance", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Insurance applied successfully!\nPolicy No: " + res.data.policyNumber);
    navigate("/user_home");
  } catch (err) {
    console.error("Submission failed:", err);
    alert("Failed to apply. Try again.");
  }
};


  if (!planData) return <div className="text-center p-4">Loading Plan Details...</div>;


console.log("Received planData:", planData);


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
        <div className="container py-4">
          <h5 className="mb-4">Apply for Insurance</h5>

          {/* Plan Summary */}
          <div className="card mb-4">
            <div className="card-body">
  <h6><b>Plan Name:</b> {planData.planName}</h6>
  <p><b>Type:</b> {planData.type}</p>
  <p><b>Coverage:</b> {planData.coverage}</p>
  <p><b>Exclusions:</b> {planData.exclusions}</p>
  <p><b>Premium:</b> ₹{planData.premium}</p>
  <p><b>Validity:</b> {planData.validity}</p>
  <p><b>Eligibility:</b> {planData.eligibility}</p>
  <p><b>Add-Ons:</b> {planData.addOns?.join(', ')}</p>
  <p><b>Vehicle Type:</b> {planData.vehicleType}</p>
  <p><b>Plan Posted On:</b> {planData.dateCreated ? new Date(planData.dateCreated).toLocaleDateString('en-GB') : 'Not Available'}</p>


</div>
          </div>

          {/* User Form */}
          <form onSubmit={handleApply} encType="multipart/form-data">
            <div className="mb-3">
              <label>Your Name</label>
              <input type="text" name="name" className="form-control" required value={userData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Your Email</label>
              <input type="email" name="email" className="form-control" value={userData.email} disabled />
            </div>
            <div className="mb-3">
              <label>Vehicle Number</label>
              <input type="text" name="vehicleNo" className="form-control" required value={userData.vehicleNo} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Address</label>
              <textarea name="address"  className="form-control" required value={userData.address} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label>Mobile Number</label>
              <input type="tel" name="mobile" className="form-control" required value={userData.mobile} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Location</label>
              <select name="location" className="form-select" required value={userData.location} onChange={handleChange}>
                <option value="">-- Select Location --</option>
                {locations.map(location => (
                  <option key={location._id} value={location.location}>{location.location}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Vehicle Photo</label>
              <input
  type="file"
  name="vehiclePhotos"
  className="form-control"
  accept="image/*"
  multiple
  onChange={(e) => setVehiclePhotos([...e.target.files])}
/>

            </div>

            <button type="submit" className="btn btn-success">Apply</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyInsuranceUser;
