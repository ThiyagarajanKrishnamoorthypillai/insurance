import React, { useState } from 'react';
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
import officer from "./img/bg-img/contact.png";
import view from "./img/bg-img/documents.png";
import customers from "./img/bg-img/user.png";
import complaint from "./img/bg-img/viewcom.png";
import myfeedback from "./img/bg-img/myfeedback.png";
import feedback from "./img/feedback.png";
import route from "./img/bg-img/route.png";
import imgMech from "./img/trash.png";
import imgRequest from "./img/destination.png";
import imgProfile from "./img/man.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const AgentHome = () => {
  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'black'}}><img src={imgSmall} alt=""/> <strong><Title /> </strong></div>
        
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
          <li><Link to="/agent_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
        </div>
      </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-center">
          <h4><div style={{color:"darkblue"}}>Agent Home</div></h4>
          </div>
         
          <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={complaint} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/view_insurance_agent">
                   View All Insurance Plan Details</Link> 
                    </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><img src={officer} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/view_customer_insurance_agent">
                   View Customer Insurance Details</Link> 
                    </div>
                </div>
              </div>
            </div>
</div>


 <div className="row g-3">
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={view} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/view_claim_agent">
                   View Insurance Claim Details</Link> 
                    </div>
                </div>
              </div>
            </div>
           
         <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={myfeedback} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/my_feedback">
                   View My Feedback</Link> 
                    </div>
                </div>
              </div>
            </div>
          
            
            
               </div>

                <div className="row g-3">

              <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                  <div className="card-body"><img src={customers} className="img-fluid" style={{width:64, height:64}} />{" "}
                  <Link  style={{color:"darkblue"}} to="/view_user_agent">
                   View User Profile</Link> 
                    </div>
                </div>
              </div>
              </div>
            
            
            <div className="col-6 col-md-6">
              <div className="card horizontal-product-card">
                <div className="card-body d-flex align-items-center">
                <div className="card-body"><i class="lni lni-user" style={{fontSize:'50px', color:'orange' }}></i>{" "}
                  <Link  style={{color:"darkblue"}} to="/agent_profile">
                   My profile </Link> 
                    </div>
                </div>
              </div>
            </div></div>
            </div>
            </div>
            </div>
          
          
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/agent_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default AgentHome