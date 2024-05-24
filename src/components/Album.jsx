import React, { useState, useEffect } from "react";

const Album = (props) => {
  const clientId = "100f567839434193a748e863eefd7ce5";
  const clientSecret = "fff3195cb1d1428faee5a8059e17f988";

  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const tracksData = await getTracks(token);
        setTracks(tracksData);
      } catch (error) {
        setError("Error fetching data");
      }
    };
    fetchData();
  }, []);

  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    if (!result.ok) {
      throw new Error("Failed to get token");
    }

    const data = await result.json();
    return data.access_token;
  };

  const getTracks = async (token) => {
    const result = await fetch(
      "https://api.spotify.com/v1/playlists/0eOOBZUbFxZg4HMRXucIT5/tracks",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    if (!result.ok) {
      throw new Error("Failed to get tracks");
    }

    const data = await result.json();
    return data.items;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`bg-${props.mode}`}>
      <div className="card-list d-flex flex-row justify-content-evenly flex-wrap">
        <div className="row my-2 mx-2">
          {tracks.map((song) => (
            <div
              key={song.track.id}
              className="col-lg-2 col-md-6 col-sm-12 my-2"
            >
              <div className="card h-100 text-light bg-dark border-success">
                <img
                  src={song.track.album.images[0].url}
                  className="card-img-top rounded"
                  alt="songimage"
                />
                <div className="card-body text-light bg-dark border-success">
                  <h5 className="card-title">{song.track.name}</h5>
                  <p className="card-text">{song.track.artists[0].name}</p>
                  <span className="text-secondary">
                    {song.track.album.name}
                  </span>
                </div>
                <div className="card-footer border-success d-flex flex-row justify-content-between">
                  <small className="text-secondary mt-1">
                    {Math.floor((song.track.duration_ms / (1000 * 60)) % 60)}:
                    {Math.floor((song.track.duration_ms / 1000) % 60)} mins
                  </small>
                  <small className="text-secondary mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-fire text-success"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                    </svg>
                    {song.track.popularity}
                  </small>
                  <button
                    type="button"
                    className="btn btn-success"
                  // onClick={() => handleSongClick(track.track)}
                  >
                    Play now
                  </button>
                </div>
                <audio controls className="d-none">
                  <source src={song.track.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Album;