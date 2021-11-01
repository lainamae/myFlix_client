import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
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