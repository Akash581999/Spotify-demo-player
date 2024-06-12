import React from "react";

const SearchSong = ({ handleSearch }) => (
  <div className="container-fluid">
    <form className="d-flex" onSubmit={handleSearch} role="search">
      <label
        htmlFor="searchSongs"
        className="form-label fw-bolder fs-5 text-primary text-nowrap mt-2"
      >
        Search:
      </label>
      <input
        id="searchSongs"
        className="form-control form-control-sm"
        type="search"
        placeholder="Search songs or artists here...."
        onChange={handleSearch}
      />
      <button className="btn btn-success mx-2" type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  </div>
);

export default SearchSong;
