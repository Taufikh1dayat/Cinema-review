import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id]);

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(movie);
    setFavorite(!favorite);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div
        className="group bg-slate-800 rounded-lg overflow-hidden
                   shadow-md hover:shadow-xl hover:-translate-y-1
                   transition-all duration-300
                   max-w-[220px] mx-auto"
      >
        {/* Poster */}
        <div className="h-[320px] overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Favorite Button */}
        {/* <button
          onClick={handleFavorite}
          className="absolute top-2 right-10 z-10 text-xl bg-black/60 rounded-full px-2 py-1 m-13"
        >
          {favorite ? "❤️" : "🤍"}
        </button> */}

        {/* Info */}
        <div className="p-2">
          <h2 className="text-sm font-semibold line-clamp-2 group-hover:text-red-400 transition-colors">
            {movie.title}
          </h2>
          <p className="text-xs text-yellow-400 mt-1">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
