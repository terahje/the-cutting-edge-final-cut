import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
	}

	submitHandler = (event) => {
		event.preventDefault();

		const email = this.emailEl.current.value;
		const password = this.passwordEl.current.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}

		const requestBody = {
			query: `
			mutation{
				createUser(userInput: {email: "${email}", password: "${password}"}){
					_id
					email
				}
			}

			`,
		};

		fetch("http://localhost:8000/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};
	render() {
		return (
			<Form onSubmit={this.submitHandler}>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						ref={this.emailEl}
					/>
					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						ref={this.passwordEl}
					/>
				</Form.Group>
				<Form.Group controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='Check me out' />
				</Form.Group>
				<Button variant='primary' type='button'>
					Sign-up
				</Button>
				{"  "}
				<Button variant='primary' type='submit'>
					Login
				</Button>
			</Form>
		);
	}
}

export default Auth;
