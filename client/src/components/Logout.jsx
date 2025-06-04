import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate ,Link } from 'react-router-dom';

import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

const Logout = () => {
  const history = useNavigate ();

  const handleLogout = () => {
  Cookies.remove('email');
  Cookies.remove('adminemail');
  Cookies.remove('agentemail');
  Cookies.remove('cook_location');
  Cookies.remove('cook_department');
  Cookies.remove('mobile1');
  Cookies.remove('token');

  localStorage.removeItem('token');

  alert('Logout Successful!');
  window.location.href = "/";
};


  return (
    <div>

    <Link to="/" onClick={handleLogout}  ><i className="lni lni-power-switch"></i>  Logout</Link>
                
    </div>
  );
};


export default Logout;
