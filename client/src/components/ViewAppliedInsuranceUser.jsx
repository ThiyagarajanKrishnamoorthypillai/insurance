import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';
import { useNavigate } from 'react-router-dom';

const ViewAppliedInsuranceUser = () => {
  const [insuranceList, setInsuranceList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const userEmail = Cookies.get("email");
const navigate = useNavigate();

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/insurance`);
        const filtered = res.data.filter(entry => entry.email === userEmail);
        setInsuranceList(filtered);
      } catch (err) {
        console.error("Failed to fetch insurance data:", err);
      }
    };
    fetchInsurances();
  }, [userEmail]);

  const openImageModal = (url) => {
    setSelectedImage(url);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="logo-wrapper" style={{ color: '#020310' }}>
            <img src={imgSmall} alt="" /> <Title />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content-wrapper">
        <div className="container py-4">
          <h5 className="mb-4">My Insurance Applications</h5>

          {insuranceList.length === 0 ? (
            <p>No applications found for your email.</p>
          ) : (
            insuranceList.map((item, index) => (
              <div className="card mb-4 shadow" key={index}>
                <div className="card-body">
                  <div className="row mb-3 align-items-start">
                    <div className="col-md-8 col-12">
                      <h5><b>{item.planName}</b> - ₹{item.premium}</h5>
                      <h6 style={{ color: "green" }}>
                        <b>Policy Number:</b> {item.policyNumber}
                      </h6>
                    </div>

                    <div className="col-md-4 col-12 text-md-end mt-3 mt-md-0">
                      <span className="badge blink-status mb-2" style={{ backgroundColor: '#ffc107', color: '#000' }}>
                        {item.status}
                      </span>

                      {item.status === "Approved" && (
                        <div className="text-end">
                          <p className="mb-1"><b>Agent Email:</b> {item.agentemail || "N/A"}</p>
                          <p className="mb-2"><b>Agent Mobile:</b> {item.mobile1 || "N/A"}</p>
             // inside the map
<button
  className="btn btn-success btn-sm"
  onClick={() => {
    if (item) {
      navigate('/apply_claim_user', { state: { insuranceData: item } });
    } else {
      alert("No plan selected");
    }
  }}
>
  Claim Insurance
</button>

                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <p><b>Type:</b> {item.type}</p>
                      <p><b>Coverage:</b> {item.coverage}</p>
                      <p><b>Exclusions:</b> {item.exclusions}</p>
                      <p><b>Validity:</b> {item.validity}</p>
                      <p><b>Eligibility:</b> {item.eligibility}</p>
                      <p><b>Vehicle Type:</b> {item.vehicleType}</p>
                    </div>
                    <div className="col-md-6">
                      <p><b>Your Name:</b> {item.name}</p>
                      <p><b>Email:</b> {item.email}</p>
                      <p><b>Mobile:</b> {item.mobile}</p>
                      <p><b>Vehicle No:</b> {item.vehicleNo}</p>
                      <p><b>Address:</b> {item.address}</p>
                      <p><b>Location:</b> {item.location}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p><b>Plan Posted:</b> {new Date(item.planDateCreated).toLocaleDateString('en-GB')}</p>
                      <p><b>Applied On:</b> {new Date(item.insuranceDateCreated).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <b>Uploaded Vehicle Photos:</b>
                    <div className="row mt-2">
                      {item.vehiclePhotos?.map((url, idx) => (
                        <div className="col-6 col-md-3 mb-3" key={idx}>
                          <img
                            src={url}
                            alt={`Vehicle ${idx + 1}`}
                            className="img-fluid rounded"
                            style={{ cursor: 'pointer', border: '1px solid #ccc' }}
                            onClick={() => openImageModal(url)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal show d-block" tabIndex="-1" onClick={closeImageModal}>
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vehicle Image</h5>
                <button type="button" className="btn-close" onClick={closeImageModal}></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedImage} alt="Vehicle" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              <li><a href="/user_home"><i className="lni lni-home"></i>Home</a></li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Blink animation */}
      <style>{`
        .blink-status {
          animation: blink 1s infinite;
          font-weight: bold;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .modal-backdrop {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ViewAppliedInsuranceUser;
