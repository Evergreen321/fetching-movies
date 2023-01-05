import MoviesList from "./MoviesList";

function MyMovies(props) {
  return (
    <section>
      <h4>MY MOVIES</h4>
      {!props.isLoading && props.movies.length > 0 && (
        <MoviesList movies={props.movies} />
      )}
      {!props.isLoading && props.movies.length === 0 && !props.error && (
        <p>No movies found. Add some using form overhead.</p>
      )}
      {!props.isLoading && props.error && <p>{props.error}</p>}
      {props.isLoading && <p>Loading...</p>}
    </section>
  );
}

export default MyMovies;
