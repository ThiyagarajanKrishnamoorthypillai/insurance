import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewClaimAgent = () => {
  const [claims, setClaims] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const userLocation = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)location\s*=\s*([^;]*).*$)|^.*$/, '$1'));

  useEffect(() => {
    const fetchClaims = async () => {
      try {
const res = await fetch(`${import.meta.env.VITE_API_URL}/claim`);
        const data = await res.json();
        const filtered = data.filter(claim => claim.location === userLocation);
        setClaims(filtered);
      } catch (err) {
        console.error("Error fetching claims:", err.message);
      }
    };

    fetchClaims();
  }, [userLocation]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/claim/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        const updatedClaims = claims.map(claim =>
          claim._id === id ? { ...claim, status: newStatus } : claim
        );
        setClaims(updatedClaims);
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'badge bg-success';
      case 'rejected': return 'badge bg-danger';
      case 'pending': default: return 'badge bg-warning text-dark';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header-area" id="headerArea">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo-wrapper"><img src={imgSmall} alt="" /> <Title /></div>
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
            <li><Link to="/agent_home"><i className="lni lni-home"></i>Home</Link></li>
            <li><Logout /></li>
          </ul>
        </div>
      </div>

      {/* Page Content */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6 className="text-primary">Claim Requests ({userLocation})</h6>
            </div>

            <div className="row gy-3">
              {claims.map((claim) => (
                <div key={claim._id} className="col-12">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <p><b>Policy:</b> {claim.policyNumber}</p>
                          <p><b>Name:</b> {claim.name}</p>
                          <p><b>Email:</b> {claim.email}</p>
                          <p><b>Mobile:</b> {claim.mobile}</p>
                          <p><b>Vehicle No:</b> {claim.vehicleNo}</p>
                          <p><b>Damage:</b> {claim.typeOfDamage}</p>
                          <p><b>Date of Incident:</b> {claim.dateOfIncident}</p>
                          <p><b>Status:</b> <span className={getStatusColor(claim.status)}>{claim.status}</span></p>
                          <select
                            className="form-select mt-2"
                            value={claim.status}
                            onChange={(e) => handleStatusChange(claim._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        <div className="col-md-4 d-flex flex-wrap gap-2">
                          {claim.photo && claim.photo.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt="Claim"
                              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, cursor: 'pointer' }}
                              onClick={() => setPreviewImage(img)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {claims.length === 0 && (
                <div className="text-center py-4 text-muted">No claims found for your location.</div>
              )}
            </div>
          </div>
        </div>

        {/* Image Preview Modal */}
     {previewImage && (
  <div
    className="image-modal"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'auto' // allow vertical scrolling
    }}
    onClick={() => setPreviewImage(null)}
  >
    <div
      style={{
        position: 'relative',
        padding: '20px',
        maxWidth: '95vw',
        maxHeight: '95vh',
        overflowY: 'auto' // scroll if image is tall
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={previewImage}
        alt="Preview"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(255,255,255,0.4)'
        }}
      />
      <button
        className="btn btn-danger fw-bold"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          margin: '10px',
          fontSize: '1.5rem',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          lineHeight: '1'
        }}
        onClick={() => setPreviewImage(null)}
      >
        ×
      </button>
    </div>
  </div>
)}


        {/* Footer */}
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

export default ViewClaimAgent;
