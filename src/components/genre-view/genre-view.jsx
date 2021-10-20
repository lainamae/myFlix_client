import React from 'react';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="value">{genre.Description}</span>
        </div>

        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}