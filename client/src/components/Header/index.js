import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Navbar
				className='navbar navbar-expand-lg navbar-dark bg-primary'
				collapseOnSelect>
				<Container>
					<Navbar.Brand href='/'>The Cutting Edge</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<NavLink to='/appt'>
								<Nav.Link href='/appt'>
									<i className='far fa-calendar-alt'> </i> Appointments
								</Nav.Link>
							</NavLink>
							<LinkContainer to='/booking'>
								<Nav.Link>
									<i className='fas fa-cut'> </i> Services
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user'> </i> Sign In
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
