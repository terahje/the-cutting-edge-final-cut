import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Auth from "./Pages/Auth";
import Booking from "./Pages/Booking";
import Appt from "./Pages/Appt";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomePage from "./Pages/HomePage";

function App() {
	return (
		<Router>
			<React.Fragment>
				<Header />
				<main className='py-3'>
					<Container>
						<Switch>
							<Redirect from='/' to='/login' exact />
							<Route path='/' component={HomePage} exact />
							<Route path='/login' component={Auth} />
							<Route path='/appt' component={Appt} />
							<Route path='/booking' component={Booking} />
						</Switch>
					</Container>
				</main>
				<Footer />
			</React.Fragment>
		</Router>
	);
}

export default App;
