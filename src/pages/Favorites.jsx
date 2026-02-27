import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  if (movies.length === 0) {
    return <p>You have no favorite movies yet.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">❤️ Favorite Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
