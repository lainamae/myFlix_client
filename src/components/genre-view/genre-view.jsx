import React from 'react';
import './genre-view.scss';
import { Button, Card } from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <Card className="text-white genre-card">
          <Card.Img src={genre.ImagePath} width="100%" maxheight="500px" crossOrigin="anonymous" />
          <div className="card-img-overlay d-flex flex-column justify-content-between">
            <span className="genreInfo">
              <h2 className="value">{genre.Name}</h2>
              <span className="value">{genre.Description}</span>
            </span>
            <Button variant="outline-light" className="back-btn" onClick={() => { onBackClick(null); }}>Back</Button>

          </div>


        </Card>
      </div>
    );
  }
}