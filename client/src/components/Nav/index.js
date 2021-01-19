import React from "react";
import Auth from "../../utils/auth";
import { Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
      <header> 
        <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
          <div className='navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav mr-auto'>
              <li className="nav-item">
                  <Link className='nav-link' to="/orderHistory">
                  <i className='far fa-calendar-alt'> </i> Appointments
                  </Link>
              </li>
              <li className="nav-item">
                  <a className='nav-link' href="/" onClick={() => Auth.logout()}>
                  Logout
                  </a>
            </li>
          </ul>
        </div>
        </Navbar>
        </header> 
      );
    } else {
      return (
        <header> 
        <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav mr-auto'>
              <li className="nav-item">
                <Link className='nav-link' to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to="/login">
                  Login
                </Link>
              </li>
            </ul>
        </div>
        </Navbar>
        </header> 
      );
    }
  }

  return (
    <header className="flex-row">
      <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'
>
      <img src={logoImage} className='logo-image' alt="logo" />
        <Link to="/">
          <span role="img" aria-label="shopping bag"></span>
          <Navbar.Brand> The Cutting Edge</Navbar.Brand>
        </Link>

      </Navbar>
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
