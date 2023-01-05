import React, { useState, useEffect, useCallback } from "react";

import AddMovie from "./components/AddMovie";
import "./App.css";
import MyMovies from "./components/MyMovies";
import StarWarsMovies from "./components/StarWarsMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [myMoviesClicked, setMyMoviesClicked] = useState(false);
  const [starWarsMovies, setStarWarsMovies] = useState([]);
  const [starWarsClicked, setStarWarsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Async fetch request to database
  const fetchMoviesHandler = useCallback(async () => {
    setMyMoviesClicked(true);
    setStarWarsClicked(false);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-18e67-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Add movie function
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-18e67-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    fetchMoviesHandler();
  }

  // Fetch Star Wars Movies
  function fetchStarWarsMoviesHandler() {
    setStarWarsClicked(true);
    setMyMoviesClicked(false);
    setIsLoading(true);
    setError(null);

    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedStarWarsMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setStarWarsMovies(transformedStarWarsMovies);
        setIsLoading(false);
      })
      .catch((err) => setError(error.message));
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchStarWarsMoviesHandler}>
          Fetch Star Wars Movies
        </button>
        <button onClick={fetchMoviesHandler}>Show My Movies</button>
      </section>
      {myMoviesClicked && (
        <MyMovies movies={movies} isLoading={isLoading} error={error} />
      )}

      {starWarsClicked && (
        <StarWarsMovies
          movies={starWarsMovies}
          isLoading={isLoading}
          error={error}
        />
      )}
    </React.Fragment>
  );
}

export default App;
