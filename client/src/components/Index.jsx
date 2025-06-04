import React from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/style.css";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/accountability.png";
import imgBack from "./img/bg-img/wall.jpeg";
import Title from './Title.jsx';

const Index = () => {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header
        style={{
          background: '#1c2541',
          color: '#ffffff',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <img src={imgSmall} alt="Logo" width="38" />
          <Title />
        </div>
        <div className="d-none d-md-block text-end" style={{ fontSize: '14px', color: '#ccc' }}>
          Vehicle Insurance Portal
        </div>
      </header>

      {/* Main Section */}
{/* Main Section */}
<main
  style={{
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    background: 'linear-gradient(to right, #edf6f9, #d6e6f2)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
  }}
>
  {/* Left: Image */}
  <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
    <img
      src={imgBack}
      alt="Insurance Visual"
      className="img-fluid rounded"
      style={{
        maxHeight: '420px',
        width: '90%',
        objectFit: 'cover',
        borderRadius: '20px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
      }}
    />
  </div>

  {/* Right: Centered Heading + Buttons */}
  <div className="col-12 col-md-5 d-flex flex-column align-items-center text-center">
    <h3 className="animated-heading mb-4 fw-bold">Select Login Type</h3>

    <div className="d-flex flex-column gap-4 align-items-center">
<Link to="/admin_login" className="btn" style={{
        backgroundColor: 'darkblue',
        color: 'white',
        borderRadius: '10px',
        width: '220px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.5s ease-in-out'
      }}>
        Admin Login
      </Link>
      <Link to="/user_login" className="btn" style={{
        backgroundColor: 'darkblue',
        color: 'white',
        borderRadius: '10px',
        width: '220px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.5s ease-in-out'
      }}>
        User Login
      </Link>

      <Link to="/agent_login" className="btn" style={{
        backgroundColor: 'darkblue',
        color: 'white',
        borderRadius: '10px',
        width: '220px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.5s ease-in-out'
      }}>
        Agent Login
      </Link>

      

    </div>
  </div>
</main>



      {/* Footer */}
      <footer
        style={{
          padding: '12px',
          background: 'linear-gradient(45deg,rgb(17, 7, 53),rgb(21, 9, 73))',
          backgroundSize: '300% 300%',
          animation: 'footerSlide 12s ease infinite',
          textAlign: 'center',
          color: '#ffffff',
          fontWeight: '500',
          fontSize: '14px'
        }}
      >
        © Copyright CSC Computer Education Mayiladuthurai | All Rights Reserved
      </footer>

      {/* Styles */}
      <style>{`
        @keyframes footerSlide {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'Segoe UI', sans-serif;
        }

        a.btn:hover {
          opacity: 0.95;
          transform: scale(1.03);
          transition: 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
