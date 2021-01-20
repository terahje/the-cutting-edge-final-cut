import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import logoImage from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

// const cal = <FontAwesomeIcon icon= {faCalendarAlt} />

function Header() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<header>
					<Navbar
						className='navbar navbar-expand-lg navbar-dark bg-primary'
						collapseOnSelect>
						<Container id='navbarColor01'>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item'>
									<LinkContainer to='/orderHistory'>
										<Nav.Link className='nav-link' to='/orderHistory'>
										{/* <h1>
											<FontAwesomeIcon icon={farCalendarAlt} />
										</h1> */}
										Appointments
										</Nav.Link>
									</LinkContainer>
								</li>
								<li className='nav-item'>
									<Nav.Link
										className='nav-link'
										href='/'
										onClick={() => Auth.logout()}>
										Logout
									</Nav.Link>
								</li>
							</ul>
						</Container>
					</Navbar>
				</header>
			);
		} else {
			return (
				<header>
					<Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
						<div className='navbar-collapse' id='navbarColor01'>
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item'>
									<Link className='nav-link' to='/signup'>
										Signup
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/login'>
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
		<header className='flex-row'>
			<Navbar className='navbar navbar-expand-lg navbar-dark bg-primary'>
				<img src={logoImage} className='logo-image' alt='logo' />
				<Link to='/'>
					<span role='img' aria-label='shopping bag'></span>
					<Navbar.Brand> The Cutting Edge</Navbar.Brand>
				</Link>
			</Navbar>
			<nav>{showNavigation()}</nav>
		</header>
	);
}

export default Header;
