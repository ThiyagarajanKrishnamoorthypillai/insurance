import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const ViewCustomerInsuranceAgent = () => {
  const [data, setData] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [cookies] = useCookies(['location', 'agentemail', 'mobile1']);
  const location = cookies.location;
  const agentemail = cookies.agentemail;
  const mobile1 = cookies.mobile1;

const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (location) {
      axios.get('http://localhost:4000/api/v1/insurance')
        .then((res) => {
          const filtered = res.data.filter(item => item.location === location);
          setData(filtered);
        }).catch(err => console.error(err));
    }
  }, [location]);

  const handleStatusChange = (id, value) => {
    setStatusUpdates(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async (id) => {
    const newStatus = statusUpdates[id];
    if (!newStatus) return alert("Select status to update.");

    try {
      await axios.put(`http://localhost:4000/api/v1/insurance/status/${id}`, {
        status: newStatus,
        agentemail,
        location, mobile1,
      });

      alert("Status updated successfully!");
      setData(prev =>
        prev.map(item => item._id === id ? { ...item, status: newStatus } : item)
      );
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update status.");
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
useEffect(() => {
  if (selectedImage) {
    document.body.style.overflow = 'hidden'; // disable scroll
  } else {
    document.body.style.overflow = 'auto'; // enable scroll
  }

  // cleanup on unmount
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [selectedImage]);

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Customer Insurance Applications - Location: {location}</h4>
      <div className="row">
        {data.map((item, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="card shadow p-3">
              <h5><b>Policy Number:</b> {item.policyNumber}</h5>
              <p><b>Name:</b> {item.name}</p>
              <p><b>Email:</b> {item.email}</p>
              <p><b>Vehicle No:</b> {item.vehicleNo}</p>
              <p><b>Address:</b> {item.address}</p>
              <p><b>Mobile:</b> {item.mobile}</p>
              <p><b>Location:</b> {item.location}</p>

              <hr />
              <p><b>Plan:</b> {item.planName}</p>
              <p><b>Type:</b> {item.type}</p>
              <p><b>Coverage:</b> {item.coverage}</p>
              <p><b>Exclusions:</b> {item.exclusions}</p>
              <p><b>Premium:</b> ₹{item.premium}</p>
              <p><b>Validity:</b> {item.validity}</p>
              <p><b>Eligibility:</b> {item.eligibility}</p>
              <p><b>Add-Ons:</b> {item.addOns.join(', ')}</p>
              <p><b>Vehicle Type:</b> {item.vehicleType}</p>

              <hr />
              <p><b>Plan Date:</b> {formatDate(item.planDateCreated)}</p>
              <p><b>Applied Date:</b> {formatDate(item.insuranceDateCreated)}</p>
              <p><b>Status:</b> <span className="text-warning fw-bold blinking">{item.status}</span></p>

              {/* Vehicle Photos */}
             {item.vehiclePhotos?.length > 0 && (
  <div className="mt-3">
    <b>Uploaded Vehicle Photos:</b>
    <div className="row mt-2">
      {item.vehiclePhotos.map((url, i) => (
        <div className="col-6 col-md-4 mb-2" key={i}>
          <img
            src={`http://localhost:4000/${url}`}
            alt={`Vehicle ${i + 1}`}
            style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer' }}
            onClick={() => setSelectedImage(`http://localhost:4000/${url}`)}
          />
        </div>
      ))}
    </div>
  </div>
)}
{selectedImage && (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
      <span
        onClick={() => setSelectedImage(null)}
        style={{
          position: 'absolute', top: 10, right: 10,
          fontSize: '30px', color: 'white', cursor: 'pointer', zIndex: 1001
        }}
      >
        &times;
      </span>
      <img
        src={selectedImage}
        alt="Full Preview"
        style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
      />
    </div>
  </div>
)}

              {/* Status Update */}
              <div className="mt-3">
                <label><b>Update Status:</b></label>
                <select
                  className="form-select"
                  value={statusUpdates[item._id] || ''}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                >
                  <option value="">-- Select Status --</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Progress">On Progress</option>
                </select>
                <button className="btn btn-primary w-100 mt-2" onClick={() => handleUpdate(item._id)}>
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .blinking {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.1; }
          100% { opacity: 1; }
        }
      `}</style>


      
    </div>

    
  );
};

export default ViewCustomerInsuranceAgent;
