import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

const heartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
	<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
</svg>

export class MovieCard extends React.Component {
	addFavorite(_id) {
		const token = localStorage.getItem("token");
		const username = localStorage.getItem('user');

		axios.post(`https://myflix-0501.herokuapp.com/users/${username}/movies/${_id}`, {}, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.catch(function (error) {
				console.log(error);
			})
	}
	render() {
		const { movie, addFavorite } = this.props;
		console.log(movie);
		return (
			<Card className="movie-card">
				<Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
				<Link to={`/movies/${movie._id}`}>
					<Card.ImgOverlay className="movie-overlay">
						<h2 className="card-title">{movie.Title}</h2>
						<button onClick={() => { this.addFavorite(movie._id) }}>{heartIcon}</button>
					</Card.ImgOverlay>
				</Link>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		// Director: PropTypes.object,
		// Genre: PropTypes.object,
		ImagePath: PropTypes.string.isRequired
	}).isRequired,
	Featured: PropTypes.bool,
};
