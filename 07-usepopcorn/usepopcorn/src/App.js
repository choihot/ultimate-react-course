import { useState, useEffect } from "react";
import StarRating from "./StarRating.js";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

const SearchBar = ({
  query,
  setQuery
}) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

const SearchStats = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{Array.isArray(movies) ? movies.length : 0}</strong> results
    </p>
  )
}

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

const WatchedMovie = ({ movie, onRemoveFromWatched }) => {
  function onRemoveFromWatchedHandler() {
    onRemoveFromWatched(movie.imdbID);
  }

  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onRemoveFromWatchedHandler()}>X</button>
      </div>
    </li>
  )
}

const WatchedStats = ({ watched }) => {

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(2);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(2);
  const avgRuntime = Number(average(watched.map((movie) => movie.runtime))).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

const Main = ({ children }) => {
  return (
    <main className="main">
      {children}
    </main>
  )
}

const WatchedMovieList = ({ watched, onRemoveFromWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onRemoveFromWatched={onRemoveFromWatched} />
      ))}
    </ul>
  )
}

const Loader = () => {
  return (
    <p className="loader">
      Loading...
    </p>
  )
}

const ErrorCmp = ({ message }) => {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  )
}

const MovieDetails = ({ selectedId, onCloseMovie, onAddToWatched, watched }) => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
    }
    onAddToWatched(newWatchedMovie)
    onCloseMovie()
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=19f6b303&i=${selectedId}`).catch(_ => {
        throw new Error("Network response was not ok");
      })
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovieDetails()
  }, [selectedId])

  useEffect(() => {
    document.title = title ? `${title} - usePopcorn` : "usePopcorn";

    return () => {
      document.title = "usePopcorn";
      console.log(`Cleanup: ${title} - usePopcorn`);
    }
  }, [title])

  return (
    <div className="details">
      {
        isLoading ? <Loader /> :
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`${title} poster`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>
                  <span>⭐️</span>
                  <span>{imdbRating} IMDb rating</span>
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                {!isWatched
                  ? <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />

                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to watched
                      </button>)}
                  </>
                  : <p>You have already rated this movie {watchedUserRating}<span>⭐️</span></p>
                }
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
      }
    </div>
  )
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }

  function onCloseMovie() {
    setSelectedId(null);
  }

  function handleAddToWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveFromWatched(id) {
    setWatched((watched) => watched.filter(move => move.imdbID !== id));
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=19f6b303&S=${query}`).catch(_ => {
          throw new Error("Network response was not ok");
        })
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        if (data.Response === "False" && data.Error) {
          throw new Error("No results found or too many results. Please refine your search.");
        }
        if (data.Search) {
          setMovies(data.Search);
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <SearchStats movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {
            isLoading && <Loader />
          }
          {
            !isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          }
          {
            error && <ErrorCmp message={error} />
          }
        </Box>
        <Box>
          {
            selectedId
              ? <MovieDetails
                selectedId={selectedId}
                onCloseMovie={onCloseMovie}
                onAddToWatched={handleAddToWatched}
                watched={watched}
              />
              : (
                <>
                  <WatchedStats watched={watched} />
                  <WatchedMovieList watched={watched} onRemoveFromWatched={handleRemoveFromWatched} />
                </>
              )
          }
        </Box>
      </Main>
    </>
  );
}
