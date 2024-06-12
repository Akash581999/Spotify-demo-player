import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchSong from "./components/SearchSong";
import SongCard from "./components/SongCard";
import Album from "./components/Album";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";
import "./App.css";

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
      <div className="container-fluid">
        <Header />
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
      {show && selectedSong && <MusicPlayer selectedSong={selectedSong} />}
      <Album />
      <Footer />
    </>
  );
};

export default App;
