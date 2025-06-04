import React, { useState, useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom';

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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';



const UpdateAgentAdmin = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [binData, setBinData] = useState({});
  
  const [editedAgent, setEditedAgent] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    location: '',
    
  });
  const [location, setLocation] = useState([]);
  const token = localStorage.getItem('token');

// Fetch location options from the backend
useEffect(() => {
  const fetchLocation = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/agent`);
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


  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/agent/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedAgent({
            name: data.name  ,
            email: data.email  ,
            mobile: data.mobile ,
            password: data.password ,
            location: data.location ,
           
            
          });
        }else {
          console.error('Error fetching business data:', response.statusText);
        } 
      } catch (error) {
        console.error('Error fetching business data:', error.message);
      }
    };

    fetchAgentDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAgent({
      ...editedAgent,
      [name]: value,
    });
  };

  const handleUpdateAgent  = async (e) =>  {
    e.preventDefault();
    try {

      // Mobile number validation
      {/*if (!/^\d{10}$/.test(editedAgent.mobile)) {
        console.error('Mobile number must be a 10-digit number');
        //errors.mobile = 'Phone must be a 10-digit number';
        alert('Mobile number must be a 10-digit number');
        return;
      }*/}

      const response = await fetch(`http://localhost:4000/api/v1/agent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        //  'x-auth-token': token,
        },
        body: JSON.stringify(editedAgent),
      });

      if (response.ok) {
        console.log('Agent details updated successfully!');
        alert("Updated successfully")
        // Add any additional logic you need after a successful update
        window.location.href = "/view_agent_admin";

      } else {
        console.error('Not updating Agent details:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating Agent details:', error.message);
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
            <h6>Edit Agent details</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form onSubmit={handleUpdateAgent} >
              
              <div className="mb-3">
                  <div className="title mb-2"><span>Name:</span></div>
                  <input className="form-control"
                    name="name" id="name"
                    value={editedAgent.name}
                    onChange={handleInputChange}    type="text"     />
                </div>
              <div className="mb-3">
                  <div className="title mb-2"><span>E-mail:</span></div>
                  <input className="form-control"
                    name="email" id="email"
                    value={editedAgent.email}
                    onChange={handleInputChange}    type="text"  />
                </div>
                <div className="mb-3">
                <div className="title mb-2"><span>Password - Leave Blank if no changes</span></div>
                  <input className="form-control" name="password" id="password"
                    value={editedAgent.password}
                    onChange={handleInputChange}   type="text"/>
                </div>


            
	  			 <div className="mb-3">
                    <div className="title mb-2"><span>Mobile:</span></div>
                  <input className="form-control" name="mobile" id="mobile"
                    value={editedAgent.mobile}
                    onChange={handleInputChange}   type="text"/>
                </div>

	    			
                <div className="mb-3">
        <div className="title mb-2"><span>Location:</span></div>
        <select
          className="form-control"
          name="location"
          id="location"
          value={editedAgent.location}
          onChange={handleInputChange}
        >
          <option value="">Select Location</option>
          {location.map(location => (
            <option key={location._id} value={location.location}>{location.location}</option>
          ))}
        </select>
      </div>

                
                <button  className="btn btn-success w-100"  type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End
        */}



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

export default UpdateAgentAdmin