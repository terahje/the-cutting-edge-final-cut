import React from "react";
import Auth from "../../utils/auth";
import { Navbar} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
      <header> 
        <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <Link to="/orderHistory">
            <i className='far fa-calendar-alt'> </i> Appointments
            </Link>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          {/* </li>
        </ul> */}
        </Navbar>
        </header> 
      );
    } else {
      return (
        <header> 
        <Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <Link to="/signup">
              Signup
            </Link>
         
            <Link to="/login">
              Login
            </Link>
            </Navbar>
        </header> 
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
        <img src={logoImage} className='logo-image' alt="logo" />
          <span role="img" aria-label="shopping bag"></span>
          <Navbar.Brand> The Cutting Edge</Navbar.Brand>
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
