import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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
										<Col>
											<LinkContainer to='/orderHistory'>
												<Nav.Link>
													<i className='far fa-calendar-alt'></i>
													Appointments
												</Nav.Link>
											</LinkContainer>
										</Col>
										<Col>
											<Nav.Link href='/' onClick={() => Auth.logout()}>
												<i className='fas fa-sign-out-alt'></i>
												Logout
											</Nav.Link>
										</Col>
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
										<Col>
											<LinkContainer to='/signup'>
												<Nav.Link>
												
												<FontAwesomeIcon icon={faPencilAlt} > </FontAwesomeIcon>
													
													
												</Nav.Link>
											</LinkContainer>
										</Col>
										<Col>
											<LinkContainer to='/login'>
												<Nav.Link to='/login'>
													<span>
														<i className='fas fa-sign-in-alt'></i>
													</span>
													Login
												</Nav.Link>
											</LinkContainer>
										</Col>
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
								<Nav.Link>
									<Navbar.Brand className='branding'>
										<img src={logoImage} className='logo-image' alt='logo' />
										The Cutting Edge
									</Navbar.Brand>
								</Nav.Link>
							</LinkContainer>
						</Col>
						<Col>
							<Nav>{showNavigation()}</Nav>
						</Col>
					</Row>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
