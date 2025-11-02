import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MoveIcon } from "lucide-react";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_KEY;

  //  Deboounce function to view movies while typing
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  //  Fetching the movies from OMDB API
  const fetchMovies = async (search) => {
    if (!search.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch {
      setError("Error fetching movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // use Debounce to fetchMovies to limit calls
  const debouncedFetch = useCallback(debounce(fetchMovies, 700), []);

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  return (
    <div className="h-[90vh]  from-gray-900 via-gray-800 to-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">🎬 Movie Finder</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full max-w-md p-3 rounded-md text-gray-900 outline-none shadow-md"
      />

      {loading && <p className="mt-4 animate-pulse">Loading movies...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full max-w-6xl">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white bg-opacity-10 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x400?text=No+Image"
              }
              alt={movie.Title}
              className="w-full h-64 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{movie.Title}</h2>
            <p className="text-sm text-gray-400">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
