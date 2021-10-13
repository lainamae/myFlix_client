import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;
		console.log(movie);
		return (
			<div
				className="movie-card"
				onClick={() => {
					onMovieClick(movie);
				}}
			>
				{movie.Title}
			</div>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Genre: PropTypes.object.isRequired,
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};
