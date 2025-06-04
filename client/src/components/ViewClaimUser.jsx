import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/bootstrap.min.css';
import './css/style.css';
import imgSmall from './img/core-img/logo-small.png';
import imgBg from './img/bg-img/9.png';
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewClaimUser = () => {
  const [claimData, setClaimData] = useState([]);

  const getCookieEmail = () => {
    const match = document.cookie.match(new RegExp('(^| )email=([^;]+)'));
    return match ? match[2] : null;
  };

  useEffect(() => {
  const fetchClaims = async () => {
    const match = document.cookie.match(/(^| )email=([^;]+)/);
    const email = match ? match[2] : null;

    if (!email) {
      console.warn("Email not found in cookies");
      return;
    }

    try {
const res = await axios.get(`http://localhost:4000/api/v1/claim/user/${email}`);
      setClaimData(res.data);
    } catch (err) {
      console.error("Error fetching claims:", err.message);
    }
  };

  fetchClaims();
}, []);


  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return <span className="badge bg-success">{status}</span>;
      case 'rejected': return <span className="badge bg-danger">{status}</span>;
      case 'pending': default: return <span className="badge bg-warning text-dark">{status}</span>;
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

      {/* Side Nav */}
      <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas">
        <button className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"></button>
        <div className="offcanvas-body">
          <div className="sidenav-profile">
            <div className="user-profile"><img src={imgBg} alt="" /></div>
            <div className="user-info"><h6>Web Based Vehicle Insurance Management System</h6></div>
          </div>
          <ul className="sidenav-nav ps-0">
            <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6 className="text-primary">My Insurance Claims</h6>
            </div>

            <div className="row gy-3">
              {claimData.map((claim) => (
                <div className="col-12" key={claim._id}>
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                        <div style={{ flex: 1 }}>
                          <h6 className="text-dark">Policy #: <b>{claim.policyNumber}</b></h6>
                          <p><b>Plan:</b> {claim.planName}</p>
                          <p><b>Name:</b> {claim.name}</p>
                          <p><b>Email:</b> {claim.email}</p>
                          <p><b>Mobile:</b> {claim.mobile}</p>
                          <p><b>Vehicle No:</b> {claim.vehicleNo}</p>
                          <p><b>Coverage:</b> {claim.coverage}</p>
                          <p><b>Exclusions:</b> {claim.exclusions}</p>
                          <p><b>Eligibility:</b> {claim.eligibility}</p>
                          <p><b>Validity:</b> {claim.validity}</p>
                          <p><b>Location:</b> {claim.location}</p>
                          <p><b>Agent Email:</b> {claim.agentemail}</p>
                          <p><b>Agent Mobile:</b> {claim.mobile1}</p>
                          <p><b>Date of Incident:</b> {claim.dateOfIncident}</p>
                          <p><b>Type of Damage:</b> {claim.typeOfDamage}</p>
                          <p><b>Date Created:</b> {claim.claimDateCreated}</p>
                          <p><b>Status:</b> {getStatusBadge(claim.status)}</p>
                        </div>
                       <div className="d-flex flex-wrap gap-2">
  {claim.photo && claim.photo.length > 0 && claim.photo.map((img, idx) => (
    <img
      key={idx}
      src={`http://localhost:4000/${img}`}
      alt="Claim"
      style={{
  height: 100,
  width: 100,
  objectFit: 'cover',
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'transform 0.2s',
}}
onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}

      onClick={() => window.open(`http://localhost:4000/${img}`, '_blank')}
    />
  ))}
</div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {claimData.length === 0 && (
                <div className="text-center py-4 text-muted">No claims found for your account.</div>
              )}
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

export default ViewClaimUser;
