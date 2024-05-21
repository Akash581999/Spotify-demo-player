import React, { useState, useEffect } from "react";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [token, setToken] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);

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

  return (
    <div className="container">
      <div className="container-fluid">
        <form className="d-flex my-3" onSubmit={handleSearch}>
          <label htmlFor="searchSongs" className="form-label text-nowrap mt-1">
            Search songs:
          </label>
          <input
            id="searchSongs"
            className="form-control form-control-sm"
            type="search"
            placeholder="Search name of songs.."
            aria-label="Search"
            onChange={handleSearch}
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </form>
        {selectedSong ? (
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{selectedSong.name}</h5>
              <p className="card-text">
                Artist: {selectedSong.artists[0].name}
              </p>
              <p className="card-text">Album: {selectedSong.album.name}</p>
              <audio controls>
                <source src={selectedSong.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
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
