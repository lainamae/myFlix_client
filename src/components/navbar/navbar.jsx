import React from 'react';
import { Navbar, Container, Nav, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navbar.scss';


export function Navbar(props) {

  isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (

    <Navbar className="main-nav" fixed="top" expand="lg" variant="dark">
      <Nav className="d-flex flex-row justify-content-between">

        <Navbar.Brand href="/"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-camera-reels-fill" viewBox="0 0 16 16">
          <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
        </svg></Navbar.Brand>
        <div className="justify-item-end">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav" >
            {
              isAuth() && (
                <Nav.Link href="/profile"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg></Nav.Link>
              )
            }

            {
              !isAuth() && (
                <span>
                  <Nav.Link href="/register">Sign up</Nav.Link>
                </span>
              )
            }


          </Navbar.Collapse>
        </div>
      </Nav>

    </Navbar >
  );
}






