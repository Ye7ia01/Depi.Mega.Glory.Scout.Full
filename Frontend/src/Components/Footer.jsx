import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-5">
      <div className="container">
        <div className="row">

          {/* Logo and Email */}
          <div className="col-md-12 col-lg-2 mb-4">
            <div className="d-none d-md-flex d-lg-none align-items-center mb-3">
              {/* Tablet View - All inline */}
              <img src={logo} alt="Logo" className="me-2" style={{ width: '50px', height: '50px' }} />
              <div className="me-2">
                <h1 className='logo-text-header m-0'>Glory</h1>
                <p className='logo-text m-0'>Scout</p>
              </div>
              <div className="position-relative" style={{ width: '200px' }}>
                <input
                  type="email"
                  className="form-control text-white border-0 pe-5"
                  placeholder="Enter Your Email"
                  style={{ backgroundColor: 'transparent' }}
                />
                <i className="bi bi-send text-white position-absolute"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '18px'
                  }}
                ></i>
              </div>
            </div>

            {/* Desktop View - stacked layout */}
            <div className="d-block d-md-none d-lg-block mb-3">
              <div className="d-flex align-items-center mb-2">
                <img src={logo} alt="Logo" className="me-2" style={{ width: '50px', height: '50px' }} />
                <div>
                  <h1 className='logo-text-header m-0'>Glory</h1>
                  <p className='logo-text m-0'>Scout</p>
                </div>
              </div>
              <div className="input-group position-relative">
                <input
                  type="email"
                  className="form-control text-white border-0 pe-5"
                  placeholder="Enter Your Email"
                  style={{ backgroundColor: 'transparent' }}
                />
                <i className="bi bi-send text-white position-absolute"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '18px'
                  }}
                ></i>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-md-2 mb-4">
            <h6 style={{ color: '#33FF33' }}>Home</h6>
            <ul className="list-unstyled">
              <li>Hero Section</li>
              <li>Features</li>
              <li>Properties</li>
              <li>Testimonials</li>
              <li>FAQ's</li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 style={{ color: '#33FF33' }}>About Us</h6>
            <ul className="list-unstyled">
              <li>Our Story</li>
              <li>Our Works</li>
              <li>How It Works</li>
              <li>Our Team</li>
              <li>Our Clients</li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 style={{ color: '#33FF33' }}>Players</h6>
            <ul className="list-unstyled">
              <li>Portfolio</li>
              <li>Categories</li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 style={{ color: '#33FF33' }}>Services</h6>
            <ul className="list-unstyled">
              <li>FAQ</li>
              <li>Strategic Marketing</li>
              <li>Negotiation Wizardry</li>
              <li>Closing Success</li>
              <li>Property Management</li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 style={{ color: '#33FF33' }}>Contact Us</h6>
            <ul className="list-unstyled">
              <li>Contact Form</li>
              <li>Our Offices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-100" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="bottom-footer mt-4 pt-3 container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center ">
            <p className="mb-2 mb-md-0 text-white-50">
              ©2025 <span style={{ color: '#33FF33' }}>GloryScout</span>. All Rights Reserved.
            </p>
            <div className="d-flex gap-3">
              <FaFacebookF className="text-white" />
              <FaLinkedinIn className="text-white" />
              <FaTwitter className="text-white" />
              <FaYoutube className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
