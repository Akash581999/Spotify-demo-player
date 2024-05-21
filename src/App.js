import React, { useState, useEffect } from "react";

const SearchSong = ({ handleSearch }) => (
  <form className="d-flex my-3" onSubmit={handleSearch}>
    <label htmlFor="searchSongs" className="form-label text-nowrap mt-1">
      Search songs:
    </label>
    <input
      id="searchSongs"
      className="form-control form-control-sm"
      type="search"
      placeholder="Search name of songs.."
      aria-labelledby="Search"
      onChange={handleSearch}
    />
    <button className="btn btn-success" type="submit">
      Search
    </button>
  </form>
);

const PlaySong = ({ selectedSong, handleSongPlay, isAudioVisible }) => (
  <div
    className="card h-100 text-light bg-dark border-success"
    style={{ maxWidth: "340px" }}
  >
    <img
      src={selectedSong.album.images[0].url}
      className="card-img-top rounded"
      alt="songimage"
      style={{ height: 260 }}
    />
    <div className="card-body text-center">
      <h3 className="card-title text-wrap">{selectedSong.name}</h3>
      <h5 className="card-text text-wrap">{selectedSong.artists[0].name}</h5>
      <span className="text-secondary text-wrap">
        {selectedSong.album.name}
      </span>
    </div>
    <div className="card-footer border-success d-flex flex-row justify-content-between">
      <small className="text-secondary mt-2">Last played 2min ago</small>
      <button
        type="button"
        className="btn btn-success"
        onClick={handleSongPlay}
      >
        Play now
      </button>
    </div>
    <audio
      controls
      className={isAudioVisible ? "d-block mb-3 mx-3" : "d-none mb-3 mx-3"}
    >
      <source src={selectedSong.preview_url} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
);

const App = () => {
  const [songs, setSongs] = useState([]);
  const [token, setToken] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [isAudioVisible, setIsAudioVisible] = useState(false);

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
  };

  const handleSongPlay = () => {
    setIsAudioVisible(true);
    // const audio = new Audio(selectedSong.preview_url);
    // audio.play();
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <SearchSong handleSearch={handleSearch} />
        {selectedSong ? (
          <PlaySong
            selectedSong={selectedSong}
            handleSongPlay={handleSongPlay}
            isAudioVisible={isAudioVisible}
          />
        ) : (
          <ul className="list-group">
            {songs.map((song) => (
              <li
                className="list-group-item"
                key={song.id}
                onClick={() => handleSongClick(song)}
              >
                {song.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
