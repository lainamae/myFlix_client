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
  }
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }
  render() {
    const { user } = this.props;

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