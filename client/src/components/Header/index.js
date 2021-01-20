import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import logoImage from "../../assets/logo.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

// // const cal = <FontAwesomeIcon icon= {faCalendarAlt} />

function Header() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<header>
					<Navbar
						className='navbar navbar-expand-lg navbar-dark bg-primary'
						collapseOnSelect>
						<Container>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='navbarColor01'>
								<Nav className='ml-auto'>
									<ul className='navbar-nav ml-auto'>
										<li className='nav-item'>
											<LinkContainer to='/orderHistory'>
												<Nav.Link className='nav-link' to='/orderHistory'>
													Appointments
												</Nav.Link>
											</LinkContainer>
										</li>
										<li className='nav-item'>
											<Nav.Link href='/' onClick={() => Auth.logout()}>
												Logout
											</Nav.Link>
										</li>
									</ul>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</header>
			);
		} else {
			return (
				<header>
					<Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
						<div className='navbar-collapse' id='navbarColor01'>
							<ul className='navbar-nav ml-auto'>
								<li className='nav-item'>
									<Nav.Link to='/signup'>Signup</Nav.Link>
								</li>
								<li className='nav-item'>
									<Nav.Link to='/login'>Login</Nav.Link>
								</li>
							</ul>
						</div>
					</Navbar>
				</header>
			);
		}
	}

	return (
		<header className='flex-row'>
			<Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
				<img src={logoImage} className='logo-image' alt='logo' />
				<Nav.Link to='/'>
					<span role='img' aria-label='shopping bag'></span>
					<Navbar.Brand> The Cutting Edge</Navbar.Brand>
				</Nav.Link>
			</Navbar>
			<nav>{showNavigation()}</nav>
		</header>
	);
}

export default Header;
