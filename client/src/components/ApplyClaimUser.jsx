import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplyClaimUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const insuranceData = location.state?.insuranceData;

  const [formData, setFormData] = useState({
    ...insuranceData,
    status: 'Pending',
    claimDateCreated: new Date().toISOString().split('T')[0],
    typeOfDamage: '',
    dateOfIncident: '',
    photo: []
  });

  useEffect(() => {
    if (!insuranceData) {
      alert("No plan selected. Redirecting...");
      navigate("/view_applied_insurance_user");
    }
  }, [insuranceData, navigate]);

  if (!insuranceData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, photo: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === 'photo') {
          formData.photo.forEach(file => {
            data.append('photo[]', file);
          });
        } else {
          data.append(key, formData[key]);
        }
      }

      await axios.post("http://localhost:4000/api/v1/claim", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Claim applied successfully!");
      navigate("/view_applied_insurance_user");
    } catch (err) {
      console.error("Error applying claim:", err);
      alert("Failed to apply claim.");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 text-primary fw-bold text-center">Apply for Insurance Claim</h4>

      <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
        {[
          ["Policy Number", "policyNumber"],
          ["Plan Name", "planName"],
          ["Name", "name"],
          ["Email", "email"],
          ["Mobile", "mobile"],
          ["Vehicle No", "vehicleNo"],
          ["Coverage", "coverage"],
          ["Exclusions", "exclusions"],
          ["Eligibility", "eligibility"],
          ["Validity", "validity"],
          ["Agent Location", "location"],
          ["Agent Email", "agentemail"],
          ["Agent Mobile", "mobile1"]
        ].map(([label, key], idx) => (
          <div className="col-md-6" key={idx}>
            <label className="text-dark">{label}</label>
            <input type="text" className="form-control" value={formData[key]} readOnly />
          </div>
        ))}

        {/* Additional Inputs */}
        <div className="col-md-12">
          <label className="text-dark">Type of Damage</label>
          <textarea
            className="form-control"
            name="typeOfDamage"
            value={formData.typeOfDamage}
            onChange={handleChange}
            placeholder="Describe the type of damage"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="text-dark">Date of Incident</label>
          <input
            type="date"
            className="form-control"
            name="dateOfIncident"
            value={formData.dateOfIncident}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="text-dark">Upload Damage Photos (Multiple)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            required
          />
        </div>

        <div className="col-12 d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-success px-4">Submit Claim</button>
        </div>
      </form>
    </div>
  );
};

export default ApplyClaimUser;
