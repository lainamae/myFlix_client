import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import { Button, Card, Row, Col, CardDeck, Form, Image } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
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