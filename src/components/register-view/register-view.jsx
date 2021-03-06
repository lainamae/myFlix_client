import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegisterView(props) {
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  const [email, SetEmail] = useState('');
  const [birthdate, SetBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  };


  return (
    <form>
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
    </form>
  );

}

RegisterView.PropTypes = {
  register: PropTypes.shape = ({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
};