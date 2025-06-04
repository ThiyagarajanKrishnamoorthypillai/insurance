import React, { useState, useEffect} from 'react';
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

// useremail  Claim mobile lat long status

const PostClaim = () => {

  

  const [formData, setFormData] = useState({
    
    useremail: '',
    
    Accident:'', Theft:'', Fire:'', Natural:'', Disaster: '',
   
    location: '',
    status: '',
    writeclaim: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [location, setLocation] = useState([]);


  const postClaimData = async () => {
    const token = localStorage.getItem('token');
    const userEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    try {
      const response = await fetch('http://localhost:4000/api/v1/claim/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...formData,
          
          useremail: userEmail,

        }),
      });

      if (response.ok) {
        console.log('Claim data posted successfully!');
        // Handle success, e.g., redirect to another page
        alert('Claim Registered Successfully!');
        window.location.href = "user_home";

      } else {
        console.error('Error posting Claim data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting Claim data:', error.message);
    }
  };



  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/location');
        if (response.ok) {
          const data = await response.json();
          setLocation(data);
        } else {
          console.error('Error fetching location data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching location data:', error.message);
      }
    };
  
    fetchLocation();
  }, []);
  

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });

  };


  // OnForm Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    postClaimData();
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
            <h6 className="user-name mb-1">Web based </h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Post Vehicle Claim</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>

              <div className="mb-3">
                  <div className="title mb-2"><span>Name:</span></div>
                  <input className="form-control"
                    name="name" id="name"
                    value={formData.name}
                    onChange={handleInputChange}    type="text"  />
                </div>

                <div className="mb-3">
                  <div className="title mb-2"><span>Landmark:</span></div>
                  <input className="form-control"
                    name="landmark" id="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}    type="text"  />
                </div>

                <div className="mb-3">
                  <div className="title mb-2"><span>Doorno/Address:</span></div>
                  <input className="form-control"
                    name="doorno" id="doorno"
                    value={formData.doorno}
                    onChange={handleInputChange}    type="text"  />
                </div>

                <div className="mb-3">
                  <div className="title mb-2"><span>Place:</span></div>
                  <input className="form-control"
                    name="place" id="place"
                    value={formData.place}
                    onChange={handleInputChange}    type="text"  />
                </div>
                 
             
<div className="mb-3">
<div className="title mb-2"><span>Select Location:</span></div>
<select name="location" value={formData.location} onChange={handleInputChange}>
  <option value="">Select Location</option>
  {location.map(location => (
    <option key={location._id} value={location.location}>{location.location}</option>
  ))}
</select></div>
<br></br>

                <br></br>
                <div className="mb-3">
    <div className="title mb-2"><span>Write Claim:</span></div>
    <textarea 
        className="form-control"
        name="writeclaim" 
        id="writeclaim"
        value={formData.writeclaim}
        onChange={handleInputChange} 
        rows="4" // Specify the number of rows for the textarea
    ></textarea>
</div>


                <button className="btn btn-success w-100"  type="submit">Register</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End*/}



        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/user_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default PostClaim