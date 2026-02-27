import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../api/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await tmdb.get(`/movie/${id}`);
        setMovie(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!movie) return <p className="text-center">Movie not found</p>;

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg"
      />

      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-slate-400 mb-4">{movie.release_date}</p>

        <p className="mb-4">{movie.overview}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-slate-700 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="text-lg font-semibold">
          ⭐ Rating: {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieDetail;
