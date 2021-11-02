import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import { Button, Card, Row, Col, CardDeck, Form, Image } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://myflix-0501.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://myflix-0501.herokuapp.com/users/${username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert(username + " has been updated!");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }
  deleteAccount() {
    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const { username } = this.state;

      axios.delete(`https://myflix-0501.herokuapp.com/users/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(username + " has been deleted.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        })
    };
  }
  removeFavorite(_id) {
    const { username } = this.state;
    const token = localStorage.getItem('token');
    console.log(_id, '_id')
    axios.delete(`https://myflix-0501.herokuapp.com/users/${username}/movies/${_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        alert('Favorite was removed')
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    const { username, email, birthday, favoriteMovies } = this.state;
    const { movies } = this.props;
    return (
      <Row>
        <Col>
          <h1>hello {user}</h1>
          <Button variant="button" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        </Col>
      </Row>
    )
  }
}