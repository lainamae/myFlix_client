import React from 'react';
import PropTypes from 'prop-types';
import MovieImg from '../../img/placeholder.png';


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
<<<<<<< HEAD
          <span className="label">Genre: </span>
=======
          <span className="label">genre: </span>
>>>>>>> main
          <span className="value">{movie.Genre.name}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}