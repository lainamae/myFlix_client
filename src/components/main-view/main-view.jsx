import axios from 'axios';
import React from 'react';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
			register: null
		};
	}


	componentDidMount() {
		axios.get('https://myflix-0501.herokuapp.com/movies')
			.then(response => {
				this.setState({
					movies: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	setSelectedMovie(movie) {
		this.setState({
			selectedMovie: movie
		});
	}

	onRegister(register) {
		this.setState({
			register
		});
	}

	onLoggedIn(user) {
		this.setState({
			user
		});
	}

	render() {

		const { movies, selectedMovie, user, register } = this.state;

		// if (!register) return <RegisterView onRegister={register => this.onRegister(register)} />

		// if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />


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
