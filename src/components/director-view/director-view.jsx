import React from 'react';
import './director-view.scss';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <Card className="text-white director-card">
          <Card.Img src={director.ImagePath} crossOrigin="anonymous" maxheight="500px" />
          <div className="card-img-overlay director-info d-flex flex-column justify-content-between">
            <span className="directorInfo">
              <h2 className="value">{director.Name}</h2>
              <span className="value">{director.Bio}</span>
              <span className="value">{director.Birth} - {director.Death}</span>
            </span>
            <Button variant="outline-light" className="back-btn" onClick={() => { onBackClick(null); }}>Back</Button>

          </div>

        </Card>
      </div>
    );
  }
}