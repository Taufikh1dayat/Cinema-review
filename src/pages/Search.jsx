import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const res = await tmdb.get("/search/movie", {
          params: { query },
        });
        setMovies(res.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  if (loading) return <p>Searching...</p>;

  return (
    <div>
      <h2 className="text-xl mb-4">
        Search result for: <span className="font-bold">{query}</span>
      </h2>

      {movies.length === 0 && <p>No results found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
