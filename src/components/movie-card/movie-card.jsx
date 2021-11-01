import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;
		console.log(movie);
		return (
			<Card className="bg-dark text-white align-self-stretch">
				<Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
				<Card.Body className="d-flex flex-column">
					<Card.Title>{movie.Title}</Card.Title>
					<div className="mt-auto d-grid gap-2">
						<Link to={`/movies/${movie._id}`}>
							<Button variant="outline-primary" className="movie-btn">Open</Button>
						</Link>
					</div>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Director: PropTypes.object,
		Genre: PropTypes.object,
		ImagePath: PropTypes.string.isRequired
	}).isRequired,
	Featured: PropTypes.bool,
};
