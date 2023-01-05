import MoviesList from "./MoviesList";

function StarWarsMovies(props) {
  let content = <p>Found no movies.</p>;
  if (props.movies.length > 0) {
    content = <MoviesList movies={props.movies} />;
  }
  if (props.error) {
    content = <p>{props.error}</p>;
  }
  if (props.isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section>
      <h4>STAR WARS MOVIES</h4>
      {!props.isLoading && props.movies.length > 0 && content}
      {!props.isLoading && props.movies.length === 0 && !props.error && content}
      {!props.isLoading && props.error && content}
      {props.isLoading && content}
    </section>
  );
}

export default StarWarsMovies;
