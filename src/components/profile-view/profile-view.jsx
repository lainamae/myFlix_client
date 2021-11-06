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
    const FavoriteMovies = favoriteMovies;
    console.log(favoriteMovies);
    return (
      <Card className="text-white profile-card">
        <Card.Header><h1>Hello {username}!</h1></Card.Header>
        <Card.Header><h2>Account information</h2></Card.Header>
        <Card.Body><p>USERNAME: {username}</p>
          <p>EMAIL: {email}</p>
          <p>BIRTHDAY: {birthday}</p></Card.Body>
        <Accordion>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <span className="d-flex flex-row justify-content-between align-items-center"><h2>Update account information</h2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-expand" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z" />
            </svg></span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
                <Form.Group>
                  <Form.Group>
                    Username
                    <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    Password
                    <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />

                  </Form.Group>
                  <Form.Group>
                    Email Address
                    <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} />

                  </Form.Group>
                  <Form.Group>
                    Birthday
                    <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

                  </Form.Group>
                </Form.Group>
                <Button variant="success" type="submit" >Update</Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
        <Card.Header><h2> Favorites</h2></Card.Header>
        <div className="d-flex flew-column">
          {
            FavoriteMovies.map((movie) => (
              <Card key={movie._id}>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text><Button variant="outline-danger" size="sm" onClick={() => { this.removeFavorite(movie._id) }}>Remove favorite</Button></Card.Text>
                </Card.Body>
              </Card>
            ))
          }
        </div>
        <Card.Body>
          <Button variant="dark" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          <Button variant="danger" onClick={() => { this.deleteAccount() }}>Delete Account</Button>
        </Card.Body>
      </Card>
    )
  }
}
