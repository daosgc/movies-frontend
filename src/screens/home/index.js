import React, { useReducer, useState, useEffect } from 'react';
import './Home.scss';
import SearchComponent from '../../components/search';
import MovieComponent from '../../components/movie';
import { initialState, reducer } from '../../store/reducer';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const apiKey = '4c16fd893b9ba73cf0d84ceb8273cb58';
const apiDiscover = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.des`

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;
  const [rating, setRating] = useState(0);
  const [moviesFiltered, setMoviesFiltered] = useState(null);

  let history = useHistory();

  const handleRedirectEv = (movieId) => {
    history.push(`/movie/${movieId}`);
  }

  const search = queryText => {
    dispatch({
      type: 'LOADING_MOVIES'
    });

    const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${queryText}`;
    const apirUrl = queryText ? apiSearch : apiDiscover;
    fetch(apirUrl)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: response.status_message ? 'MOVIES_FAILURE' : 'MOVIES_SUCCESS',
        payload: response.status_message ? response.status_message : response.results
      });
    })
    .catch(err => {
      dispatch({
        type: "MOVIES_FAILURE",
        payload: err
      });
    });
  };

  useEffect(() => {
    dispatch({
      type: 'LOADING_MOVIES'
    });

    fetch(apiDiscover)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: response.status_message ? 'MOVIES_FAILURE' : 'MOVIES_SUCCESS',
        payload: response.status_message ? response.status_message : response.results
      });
    })
    .catch(err => {
      dispatch({
        type: 'MOVIES_FAILURE',
        payload: err
      });
    });
  }, []);

  const onRatingFilter = (value) => {
    setRating(value);
    if (value) {
      const stepRating = 2;
      const toRating = value * stepRating;
      const fromRating = toRating - stepRating;
      const newMovies = movies.filter(m => m.vote_average >= fromRating && m.vote_average < toRating);
      setMoviesFiltered(newMovies);
    } else {
      setMoviesFiltered(null);
    }
  }

  const moviesList = moviesFiltered ? moviesFiltered : movies;
  const retrievedMovies =
    loading && !errorMessage ? (
      <CircularProgress />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      (moviesList && moviesList.length > 0) ? moviesList.map((movie) => (
        <div onClick={() => handleRedirectEv(movie.id)} key={movie.id}>
          <MovieComponent movie={movie}/>
        </div>
      )) : (
        <div className="placeholder">No Movies</div>
      )
    );

  return (
    <div className="home">
      <div className="header-container">
        <div className="title">Your favorite movies</div>
        <div className="searchComponent">
          <SearchComponent search={search} />
        </div>
      </div>
      <div className="rating-container">
        <div className="label">Rating</div>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => onRatingFilter(newValue)}
        />
      </div>
      <div className="movies-container">{retrievedMovies}</div>
    </div>
  );
}

export default Home;
