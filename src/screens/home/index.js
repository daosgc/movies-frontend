import React, { useReducer, useState, useEffect } from 'react';
import './Home.scss';
import SearchComponent from '../../components/search';
import MovieComponent from '../../components/movie';
import { initialState, reducer } from "../../store/reducer";
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";

const apiKey = '4c16fd893b9ba73cf0d84ceb8273cb58';
const apiDiscover = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;
  const [rating, setRating] = useState(0);

  let history = useHistory();

  const handleRedirectEv = (movieId) => {
    history.push(`/movie/${movieId}`);
  }

  const search = queryText => {
    dispatch({
      type: "LOADING_MOVIES"
    });

    const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${queryText}`;
    const apirUrl = queryText ? apiSearch : apiDiscover;
    fetch(apirUrl)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: "MOVIES_SUCCESS",
        payload: response.results
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
      type: "LOADING_MOVIES"
    });

    fetch(apiDiscover)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: "MOVIES_SUCCESS",
          payload: response.results
        });
      })
      .catch(err => {
        dispatch({
          type: "MOVIES_FAILURE",
          payload: err
        });
      });

  }, []);


  const retrievedMovies =
    loading && !errorMessage ? (
      <div className="loading">Cargando..</div>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie) => (
        <div onClick={() => handleRedirectEv(movie.id)} key={movie.id}>
          <MovieComponent movie={movie}/>
        </div>
      ))
    );

  return (
    <div className="home-container">
      <SearchComponent search={search} />
      <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      <div className="movies">{retrievedMovies}</div>
    </div>
  );
}

export default Home;
