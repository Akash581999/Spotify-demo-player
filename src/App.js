import React, { useState, useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css"; // Import CSS file for styling

const SearchSong = ({ handleSearch }) => (
  <div className="container-fluid">
    <form className="d-flex my-3" onSubmit={handleSearch} role="search">
      <label
        htmlFor="searchSongs"
        className="form-label fw-bolder fs-5 text-success text-nowrap mt-2"
      >
        Search songs:
      </label>
      <input
        id="searchSongs"
        className="form-control form-control-sm"
        type="search"
        placeholder="Search song or artist"
        onChange={handleSearch}
      />
      <button className="btn btn-success" type="submit">
        Search
      </button>
    </form>
  </div>
);

const SongCard = ({ song, handleSongClick }) => (
  <div className="col-md-4 mb-4">
    <div
      className="card h-100 text-light bg-dark border-success mt-1"
      style={{ maxWidth: 360 }}
    >
      <img
        src={song.album.images[0].url}
        className="card-img-top rounded"
        alt="songimage"
        style={{ height: 240 }}
      />
      <div className="card-body text-light bg-dark border-success">
        <h5 className="card-title text-wrap text-center">{song.name}</h5>
        <p className="card-text text-wrap text-center">
          {song.artists[0].name}
        </p>
        <p className="card-text text-secondary text-center text-wrap ">
          {song.album.name}
        </p>
      </div>
      <div className="card-footer border-success d-flex flex-row justify-content-between">
        <small className="text-secondary mt-2">
          {Math.floor(song.duration_ms / 60 / 60 / 24)}:
          {Math.floor(song.duration_ms % 60)} mins
        </small>
        <small className="text-secondary text-wrap mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-fire"
            viewBox="0 0 16 16"
          >
            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
          </svg>
          {song.popularity}
        </small>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleSongClick(song)}
        >
          Play now
        </button>
      </div>
    </div>
  </div>
);

const App = () => {
  const [songs, setSongs] = useState([]);
  const [token, setToken] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const clientId = "100f567839434193a748e863eefd7ce5";
      const clientSecret = "fff3195cb1d1428faee5a8059e17f988";

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
        },
        body: "grant_type=client_credentials",
      });

      const data = await response.json();
      setToken(data.access_token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const handleSearch = async (e) => {
    const searchValue = e.target.value.trim();
    if (!searchValue) return;

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchValue}&type=track`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      setSongs(data.tracks.items);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setShow(true);
  };

  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <SearchSong handleSearch={handleSearch} />
          <div className="row">
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                handleSongClick={handleSongClick}
              />
            ))}
          </div>
        </div>
      </div>
      {show && selectedSong && <MusicPlayer selectedSong={selectedSong} />}
    </>
  );
};

export default App;
