import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setQuery("");
  };

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8 px-6 py-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎬</span>
        <Link to="/" className="text-2xl font-bold">
          CineScope
        </Link>

        <Link
          to="/favorites"
          className="ml-4 text-sm text-slate-300 hover:text-white"
        >
          ❤️ Favorites
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-md bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700">
          Search
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
