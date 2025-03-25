import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { AdminContext } from "../../context/AdminContext";
import "./header.css";

const Header = () => {
  const { aToken } = useContext(AdminContext);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const nav_links = aToken
    ? [
        {
          path: "/home",
          display: "Home",
        },
        {
          path: "/tours",
          display: "Tours",
        },
      ]
    : [
        {
          path: "/home",
          display: "Home",
        },
        {
          path: "/tours",
          display: "Tours",
        },
        {
          path: "/admin-login",
          display: "Admin",
        },
      ];

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const logoutAdmin = () => {

    localStorage.removeItem("aToken");

    dispatch({ type: "LOGOUT" });
    navigate("/");
    window.location.reload();  // Force page reload
  };
  

  useEffect(() => {
    // Sticky Header on Scroll
    const stickyHeaderFunc = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        document.getElementById("header").classList.add("sticky__header");
      } else {
        document.getElementById("header").classList.remove("sticky__header");
      }
    };
    window.addEventListener("scroll", stickyHeaderFunc);
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  return (
    <header className="header" id="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" width="150" />
          </a>
          
          {/* Navbar Toggler (for mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileMenuVisible(!isMobileMenuVisible)}
            aria-controls="navbarNav"
            aria-expanded={isMobileMenuVisible ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isMobileMenuVisible ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {nav_links.map((item, index) => (
                
                <li className="nav-item" key={index}>
  
                  <NavLink
                    to={item.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {item.display}
                  </NavLink>
                 
                </li>
              ))}
            </ul>
          </div>

          {/* Navbar Buttons (Login/Logout/Register) */}
          <div className="d-flex align-items-center gap-4">
            {aToken ? (
              <>
                <h5
                  onClick={() => navigate("/admin")}
                  className="mb-0 navigations"
                >
                  Admin
                </h5>
                <button className="btn btn-dark" onClick={logoutAdmin}>
                  Logout
                </button>
              </>
            ) : user ? (
              <>
                <h5 className="mb-0">{user.username}</h5>
                <button className="btn btn-dark" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn secondary__btn">
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn primary__btn">
                  <Link to="/register">Register</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
