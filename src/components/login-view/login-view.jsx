import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
	const [username, SetUsername] = useState('');
	const [password, SetPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication then call props.onLoggedIn(username) */
		props.onLoggedIn(username);
	};

	return (
		<form>
			<label>
				Username:
				<input type="text" value={username} onChange={(e) => SetUsername(e.target.value)} />
			</label>
			<label>
				Password:
				<input type="password" value={password} onChange={(e) => SetPassword(e.target.value)} />
			</label>
			<button type="submit" onClick={handleSubmit}>
				Submit
			</button>
		</form>
	);
}

LoginView.propTypes = {
	user: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthdate: PropTypes.string.isRequired,
		FavoriteMovies: PropTypes.array,
	}),
};
