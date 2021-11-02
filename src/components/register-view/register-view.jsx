import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './register-view.scss';


export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix-0501.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthdate
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      })
  };

  return (
    <Form>
      <label className="username">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="password">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="email">
        E-mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="birthdate">
        Birth date:
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </label>
      <button className="registerBtn" type="submit" onClick={handleSubmit}>
        Register
      </button>
    </Form>
  );
}

RegisterView.propTypes = {
  user: PropTypes.exact({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array,
  }),
  onRegister: PropTypes.func,
};
