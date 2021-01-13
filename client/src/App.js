import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomePage from "./components/Pages/HomePage";

function App() {
	return (
		<div>
			<Header />
			<main className='py-3'>
				<Container>
					<HomePage />
				</Container>
			</main>
			<Footer />
		</div>
	);
}

export default App;
