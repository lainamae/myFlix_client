import React from 'react';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-biography">
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-lifespan">
          <span className="value">{director.Birth} - {director.Death}</span>
        </div>

        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}