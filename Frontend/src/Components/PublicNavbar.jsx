import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const [LastPath , SetLastPath] = useState(false)
  const location = useLocation();
  useEffect(()=>{
    const path = location.pathname;
      // console.log(path, "welcome");
      if (path.endsWith("/register-player") || path.endsWith("/register-coaches")) {
        SetLastPath(true)
        // console.log("Welcome");
      }else{
        // console.log("Not Register");
        SetLastPath(false)
      }
      
    },[location.pathname])
  return (
    <div className="container mt-4">
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 ${
          isOpen ? "" : "rounded-pill"
        }`}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              className="logo-img me-2"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="d-flex flex-column">
              <h1 className="logo-text-header m-0">Glory</h1>
              <p className="logo-text m-0">Scout</p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarContent"
          >
            <ul className="navbar-nav mx-auto mt-3 mt-lg-0">
              <li className="nav-item mx-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : "text-white"}`
                  }
                  style={({ isActive }) =>
                    isActive ? { color: "#33FF33" } : {}
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : "text-white"}`
                  }
                  style={({ isActive }) =>
                    isActive ? { color: "#33FF33" } : {}
                  }
                >
                  Players
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="/home/email"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : "text-white"}`
                  }
                  style={({ isActive }) =>
                    isActive ? { color: "#33FF33" } : {}
                  }
                >
                  Coaches
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : "text-white"}`
                  }
                  style={({ isActive }) =>
                    isActive ? { color: "#33FF33" } : {}
                  }
                >
                  About Us
                </NavLink>
              </li>
            </ul>

            <div className="d-flex gap-2 mt-3 mt-lg-0">
            <div className="plan">
              <NavLink  to="/register-coaches" className={`btn rounded-pill px-4 py-2 ${LastPath ? "d-flex" : "d-none"}`}  style={{ backgroundColor: "#33FF33", color: "black" }} >For Coaches </NavLink>
              <NavLink to="/register-player" className={`btn border-0 px-4 py-2 ${LastPath ? "d-flex" : "d-none"}`}  style={{color: "#FFFF" }}> For Players</NavLink>
              </div>
              <NavLink 
                to="/login" 
                className={`${({ isActive }) => ` btn-link text-decoration-none d-flex justify-content-center align-items-center ${isActive ? "text-success" : "text-white"}`}  ${LastPath ? "custom-nav rounded-pill px-4 py-2" : ""}`} 
              >
                Login
              </NavLink>

              <NavLink to="/register-player" className={`btn rounded-pill px-4 py-2 ${LastPath ? "d-none" : "d-flex"}`} style={{ backgroundColor: "#33FF33", color: "black" }} > Sign Up </NavLink>
             
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PublicNavbar;
