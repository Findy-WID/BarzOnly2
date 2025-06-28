import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SongsCard from "./components/SongsCard";
import GlobalPlayer from "./components/GlobalPlayer";
import SearchBar from "./components/SearchBar";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageNum = 1;

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://robo-music-api.onrender.com/music/my-api?page=${pageNum}`);
      const data = await res.json();
      console.log("Api data:", data);
      setSongs(data);
      setFilteredSongs(data);
    } catch (error) {
      console.error("failed to fetch song:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const currentSong = filteredSongs[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredSongs.length);
    setIsPlaying(true);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredSongs.length) % filteredSongs.length);
    setIsPlaying(true);
  };

  const handleSongSelect = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="w-[90vw] max-w-7xl mx-auto">
      <Header />
      <div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Now Playing</h1>
          <SearchBar songs={songs} setFilteredSongs={setFilteredSongs} />
        </div>
        {loading ? (
          <p className="text-center text-xl">loading songs ...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {filteredSongs.length === 0 ? (
              <p className="text-center text-xl">No songs found</p>
            ) : (
              filteredSongs.map((song, index) => (
                <SongsCard key={song.id} song={song} onSelect={() => handleSongSelect(index)} />
              ))
            )}
          </div>
        )}
      </div>
      <GlobalPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleNext={goToNext}
        handlePrev={goToPrev}
      />
    </div>
  );
}

export default App;