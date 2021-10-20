import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';




import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			user: null,
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken);
		}
	}

	// Login 
	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

			.then(response => {
	// Get all movies in DB
	getMovies(token) {
		axios.get('https://myflix-0501.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(response => {
				console.log(response)
				// Assign the result to the state
				this.setState({
					movies: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}



		this.setState({
		});
	}
	render() {

		const { movies, selectedMovie, user, register } = this.state;




		if (movies.length === 0) return <div className="main-view"></div>;

		return (
			<Row className="main-view justify-content-md-center">
				{selectedMovie
					? (
						<Col md={8}>
							<MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
						</Col>
					)
					: movies.map(movie => (
						<Col md={3} key={movie._id}>
							<MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
						</Col>
					))
				}
			</Row>
		);
	}
}
