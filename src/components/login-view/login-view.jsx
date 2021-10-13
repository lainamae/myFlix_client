import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, SetUsername ] = useState('');
  const [ password, SetPassword ] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
  /* Send a request to the server for authentication then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

<<<<<<< Updated upstream
  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => SetUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => SetPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
=======
	return (
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
	);
>>>>>>> Stashed changes
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array,
  })
}