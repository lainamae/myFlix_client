import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('https://myflix-0501.herokuapp.com/login', {
			Username: username,
			Password: password
		})
			.then(response => {
				const data = response.data;
				props.onLoggedIn(data);
			})
			.catch(e => {
				console.log('no such user')
			})
	};

	return (
		<span>
			<form>
				<Form.Group controlId="formUsername">
					<Form.Label>Username:</Form.Label>
					<Form.Control type="text" onChange={e => setUsername(e.target.value)} />
				</Form.Group>

				<Form.Group controlId="formPassword">
					<Form.Label>Password:</Form.Label>
					<Form.Control type="password" onChange={e => setPassword(e.target.value)} />
				</Form.Group>
				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</form>
			<Row>
				<Col>New user? <a href="/register"> Register today.</a></Col>
			</Row>
		</span>
	);
}

LoginView.propTypes = {
	user: PropTypes.exact({
		Name: PropTypes.string.isRequired,
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthdate: PropTypes.string.isRequired,
		FavoriteMovies: PropTypes.array,
	}),
};
