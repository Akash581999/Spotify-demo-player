import React from "react";

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

export default SongCard;
