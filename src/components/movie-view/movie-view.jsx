import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick} = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} height="250px"/>
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
          <span className="label">genre: </span>
          <span className="value">{movie.Genre.name}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
       </div>
    );
  }
}