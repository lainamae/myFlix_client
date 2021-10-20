import React from 'react';
import PropTypes from 'prop-types';
import MovieImg from '../../img/placeholder.png';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={MovieImg} width="100%" height="250px" />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.name}</span>
        </div>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}