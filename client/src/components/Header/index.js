import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Nav, Container } from "react-bootstrap";

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
									<LinkContainer to='/orderHistory'>
										<Nav.Link>
											<i className='far fa-calendar-alt'></i>
											Appointments
										</Nav.Link>
									</LinkContainer>
									<Nav.Link href='/' onClick={() => Auth.logout()}>
										<i className='fas fa-sign-out-alt'></i>
										Logout
									</Nav.Link>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</header>
			);
		} else {
			return (
				<header>
					<Navbar
						className='navbar navbar-expand-lg navbar-dark bg-primary'
						collapseOnSelect>
						<Container>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='navbarColor01'>
								<Nav className='ml-auto'>
									<LinkContainer to='/signup'>
										<Nav.Link>
											<i className='fas fas-user-plus'></i>
											Signup
										</Nav.Link>
									</LinkContainer>
									<LinkContainer to='/login'>
										<Nav.Link to='/login'>
											<i className='fas fa-sign-in-alt'></i>
											Login
										</Nav.Link>
									</LinkContainer>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</header>
			);
		}
	}

	return (
		<header>
			<Navbar
				className='navbar navbar-expand-lg navbar-dark bg-primary'
				collapseOnSelect>
				<Container>
					{/* <span role='img' aria-label='shopping bag'></span> */}
					<LinkContainer to='/'>
						<Nav.Link>
							<Navbar.Brand>
								<img src={logoImage} className='logo-image' alt='logo' />
								The Cutting Edge
							</Navbar.Brand>
						</Nav.Link>
					</LinkContainer>
					<Nav>{showNavigation()}</Nav>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
