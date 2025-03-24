import React, { useRef, useEffect, useContext } from "react";
// import { Container, Row, Button, ButtonDropdown } from 'reactstrap'
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import logo from '../../assets/images/logo.png'
import logo from "../../assets/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import { AdminContext } from "../../context/AdminContext";


const Header = () => {

  const {aToken} = useContext(AdminContext)


  const nav_links = aToken
  ? [
      {
        path: "/home",
        display: "Home",
      },
      {
        path: "/tours",
        display: "Tours",
      }
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
        path: '/admin-login',
        display: 'Admin',
      },
    ];


  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const logoutAdmin = () => {
  
    localStorage.removeItem('aToken'); 
    navigate('/');  
};

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/*=============logo===========*/}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/*=============logo end========== */}
            {/*=============menu start===========*/}
            <div className="navigation">
              <ul className="menu d-flex align-items-left gap-2 custom-menu">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/*=============menu end============= */}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">

              {
  aToken ? (
    // If the aToken is present (assuming the user is admin)
    aToken ? (
      <>
        <h5 onClick={()=>navigate('/admin')} className="mb-0 navigations">Admin</h5>
        <Button className="btn btn-dark" onClick={logoutAdmin}>
          Logout
        </Button>
      </>
    ) : (
      <>
        <Button className="btn secondary__btn">
          <Link to="/login">Login</Link>
        </Button>
        <Button className="btn primary__btn">
          <Link to="/register">Register</Link>
        </Button>
      </>
    )
  ) : (
    // If the aToken is not present (non-admin user)
    user ? (
      <>
        <h5 className="mb-0">{user.username}</h5>
        <Button className="btn btn-dark" onClick={logout}>
          Logout
        </Button>
      </>
    ) : (
      <>
        <Button className="btn secondary__btn">
          <Link to="/login">Login</Link>
        </Button>
        <Button className="btn primary__btn">
          <Link to="/register">Register</Link>
        </Button>
      </>
    )
  )
}


              </div>
              <span className="mobile__menu">
                <i class="ri-menu-line"> </i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
