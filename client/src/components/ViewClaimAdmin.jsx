import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ViewClaimAdmin = () => {
  const [claims, setClaims] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/claim/`);
        if (res.status === 200) setClaims(res.data);
      } catch (err) {
        console.error("Failed to fetch claim data", err);
      }
    };
    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved": return "badge bg-success";
      case "rejected": return "badge bg-danger";
      case "pending": default: return "badge bg-warning text-dark";
    }
  };

  const resolveImagePath = (path) =>
    path.replace("public\\", "").replace("public/", "").replaceAll("\\", "/");

  return (
    <div>
      {/* Header */}
      <div className="header-area" id="headerArea">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo-wrapper text-dark"><img src={imgSmall} alt="" /> <Title /></div>
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
              <h6 className="text-primary">All Claim Applications</h6>
            </div>

            <div className="row gy-4">
              {claims.map((item) => (
                <div className="col-12 col-md-6" key={item._id}>
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="text-dark mb-3">📑 Policy: {item.policyNumber}</h5>
                      <p><b>Status:</b> <span className={getStatusClass(item.status)}>{item.status}</span></p>

                      <h6 className="text-muted mt-3">🧾 Claim Details</h6>
                      <p><b>Plan Name:</b> {item.planName}</p>
                      <p><b>Type of Damage:</b> {item.typeOfDamage}</p>
                      <p><b>Date of Incident:</b> {item.dateOfIncident}</p>
                      <p><b>Claim Date:</b> {item.claimDateCreated}</p>

                      <h6 className="text-muted mt-3">🚗 Vehicle Info</h6>
                      <p><b>Vehicle No:</b> {item.vehicleNo}</p>
                      <p><b>Coverage:</b> {item.coverage}</p>
                      <p><b>Exclusions:</b> {item.exclusions}</p>
                      <p><b>Eligibility:</b> {item.eligibility}</p>
                      <p><b>Validity:</b> {item.validity}</p>

                      <h6 className="text-muted mt-3">👤 Customer Info</h6>
                      <p><b>Name:</b> {item.name}</p>
                      <p><b>Email:</b> {item.email}</p>
                      <p><b>Mobile:</b> {item.mobile}</p>
                      <p><b>Location:</b> {item.location}</p>

                      <h6 className="text-muted mt-3">🧑‍💼 Agent Info</h6>
                      <p><b>Email:</b> {item.agentemail}</p>
                      <p><b>Mobile:</b> {item.mobile1}</p>

                      <h6 className="text-muted mt-3">🖼️ Claim Photos</h6>
                      <div className="d-flex overflow-auto gap-2" style={{ whiteSpace: "nowrap" }}>
                        {item.photo && item.photo.map((photo, idx) => (
                          <img
                            key={idx}
                            src={`http://localhost:4000/${resolveImagePath(photo)}`}
                            alt="Claim"
                            style={{
                              height: 100,
                              width: 100,
                              objectFit: "cover",
                              cursor: "pointer",
                              borderRadius: 6
                            }}
                            onClick={() => setPreviewImage(`http://localhost:4000/${resolveImagePath(photo)}`)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {claims.length === 0 && (
                <div className="text-center py-4 text-muted">No claims found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Full Image Preview */}
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
              overflowY: 'auto'
            }}
            onClick={() => setPreviewImage(null)}
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '95vw',
                maxHeight: '95vh'
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
                  borderRadius: 10
                }}
              />
              <button
                className="btn btn-light fw-bold position-absolute top-0 end-0 m-2"
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

export default ViewClaimAdmin;
