import React, { useState } from "react";
import axios from "axios";

function GithubUserFinder() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const headers = {
        Authorization: import.meta.env.VITE_GITHUB_TOKEN
          ? `token ${import.meta.env.VITE_GITHUB_TOKEN}`
          : undefined,
      };

      const res = await axios.get(`https://api.github.com/users/${username}`, {
        headers,
      });
      setUser(res.data);
    } catch (err) {
      setError("User not found or API limit reached.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };

  return (
    <div className="bg-zinc-400 shadow-lg text-white  p-8 h-[100vh]">
      <h1 className="text-4xl font-bold mb-7 text-center">
        GitHub User Finder
      </h1>

      <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded-lg outline-none w-[50%] focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mx-auto text-gray-500">Loading...</p>}
      {error && <p className="text-center mx-auto text-red-500">{error}</p>}

      {user && (
        <div className="mt-4 text-center mx-auto">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full mx-auto mb-3 border"
          />
          <h2 className=" font-semibold text-white text-3xl">{user.name || user.login}</h2>
          <p className="text-gray-600">{user.bio}</p>

          <div className="flex justify-around mt-4 text-gray-700">
            <div>
              <p className="font-bold text-white text-2xl">{user.followers}</p>
              <h2 className=" text-white text-2xl">Followers</h2>
            </div>
            <div>
              <p className="font-bold text-white text-2xl">{user.following}</p>
              <h2 className=" text-white text-2xl">Following</h2>
            </div>
            <div>
              <p className="font-bold text-white text-2xl">{user.public_repos}</p>
              <h2 className=" text-white text-2xl">Repositories</h2>
            </div>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default GithubUserFinder;
