import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

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
							<Nav.Link href='/appt'>
								<i className='far fa-calendar-alt'> </i> Appointments
							</Nav.Link>
							<Nav.Link href='/booking'>
								<i className='fas fa-cut'> </i> Services
							</Nav.Link>
							<Nav.Link href='/login'>
								<i className='fas fa-user'> </i> Sign In
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
