import { useState, useMemo } from "react";

export default function SearchBar({ songs, setFilteredSongs }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useMemo(() => {
    if (searchInput.trim() === "") {
      setFilteredSongs(songs);
      return;
    }
    const filtered = songs.filter(
      (song) =>
        song.songTitle.toLowerCase().includes(searchInput.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [songs, searchInput, setFilteredSongs]);

  return (
    <input
      type="text"
      placeholder="Search songs..."
      value={searchInput}
      onChange={handleSearchInput}
      className="w-full max-w-[200px] sm:max-w-md rounded-lg border border-gray-300 p-2"
    />
  );
}