import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions'
import { setUser } from '../../actions/actions'


// Components
import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navbar } from '../navbar/navbar';
import MoviesList from '../movies-list/movies-list';


// Styles
import './main-view.scss';

// Bootstrap components
import { Container, Row, Col } from 'react-bootstrap';

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

	render() {
		const { movies, user } = this.state;
		return (
			<Container fluid>
				<Navbar />
				<Container>
					<Router>
						<Row className="main-view justify-content-md-center d-flex main-route">

							<Route exact path="/" render={() => {
								if (!user) return <Col>
									<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
								</Col>

								if (movies.length === 0) return <div className="main-view" />;

								return movies.map(m => (
									<Col md={3} key={m._id} className="d-flex">
										<MovieCard movie={m} />
									</Col>
								))
							}} />

							<Route path="/register" render={() => {
								if (user) return <Redirect to="/" />
								return <Col>
									<RegisterView />
								</Col>
							}} />

							<Route exact path='/profile' render={({ history }) => {
								if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
								// if (movies.length === 0) return;

								return <Col md={8}><ProfileView history={history} movies={movies} user={user} onBackClick={() => history.goBack()} /></Col>
							}} />

							<Route path="/movies/:movieId" render={({ match, history }) => {
								if (!user) return <Col>
									<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
								</Col>
								return <Col md={8}>
									<MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
								</Col>
							}} />

							<Route exact path="/directors/:name" render={({ match, history }) => {
								if (!user) return <Col>
									<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
								</Col>
								if (movies.length === 0) return <div className="main-view" />;
								return <Col md={8}>
									<DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
								</Col>
							}
							} />
							<Route path="/genres/:name" render={({ match, history }) => {
								if (!user) return <Col>
									<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
								</Col>
								if (movies.length === 0) return <div className="main-view" />;
								return <Col md={8}>
									<GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
								</Col>
							}
							} />
						</Row>
					</Router>
				</Container>
			</Container>
		);
	}
}

let mapStateToProps = state => {
	return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
