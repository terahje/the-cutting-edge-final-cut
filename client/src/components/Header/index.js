import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import logoImage from "../../assets/logo.png";
import "./header.css";

function Header() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<header>
					<Navbar
						className='navbar navbar-expand-lg navbar-dark bg-primary'
						collapseOnSelect>
						<Container>
							<Row>
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
							</Row>
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
							<Row>
								<Navbar.Toggle aria-controls='basic-navbar-nav' />
								<Navbar.Collapse id='navbarColor01'>
									<Nav className='ml-auto'>
											<LinkContainer to='/signup'>
												<Nav.Link to='/signup'>
													<i className='fas fa-user-plus'></i> 
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
							</Row>
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
				<Container fluid>
					<Row>
						{/* <span role='img' aria-label='shopping bag'></span> */}
						<Col>
							<LinkContainer to='/'>
								<Link to="/">
									<Navbar.Brand className='branding'>
										<img src={logoImage} className='logo-image' alt='logo' />
										The Cutting Edge
									</Navbar.Brand>
								</Link>
							</LinkContainer>
						</Col>
						<Col className='showNav'>
						<Nav> {showNavigation()}</Nav>
						</Col>
					</Row>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
