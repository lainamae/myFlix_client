import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MovieImg from '../../img/placeholder.png';

export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;
		console.log(movie);
		return (
			<Card>
				<Card.Img variant="top" src={MovieImg} width="270px" />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description}</Card.Text>
					<Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
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
	onMovieClick: PropTypes.func.isRequired
};
