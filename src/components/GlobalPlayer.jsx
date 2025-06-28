import { useEffect, useRef, useState } from "react";

export default function GlobalPlayer({ currentSong, isPlaying, setIsPlaying, handleNext, handlePrev }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentSong]);

  const handleSeek = (e) => {
    const bar = e.target;
    const clickPosition = e.nativeEvent.offsetX;
    const newTime = (clickPosition / bar.clientWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-2 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between z-50">
      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src={currentSong.songImage}
          alt={currentSong.songTitle}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
        />
        <div>
          <h3 className="font-semibold text-sm sm:text-base">{currentSong.songTitle}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{currentSong.artistName}</p>
        </div>
      </div>

      <div className="hidden sm:block w-full max-w-xs mx-4">
        <div
          className="h-3 sm:h-4 bg-gray-300 rounded-full cursor-pointer w-full"
          onClick={handleSeek}
        >
          <div
            className="h-3 sm:h-4 bg-purple-600 rounded-full"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
        <div
          className="sm:hidden h-3 bg-gray-300 rounded-full cursor-pointer w-full max-w-md"
          onClick={handleSeek}
        >
          <div
            className="h-3 bg-purple-600 rounded-full"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <audio
            ref={audioRef}
            src={currentSong.songUrl}
            onEnded={handleNext}
          />
          <button onClick={handlePrev} className="bg-gray-300 px-2 py-1 sm:px-3 sm:py-1 rounded text-sm">⏮</button>
          <button onClick={togglePlay} className="bg-purple-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base">
            {isPlaying ? "Pause ⏸" : "Play ▶"}
          </button>
          <button onClick={handleNext} className="bg-gray-300 px-2 py-1 sm:px-3 sm:py-1 rounded text-sm">⏭</button>
        </div>
      </div>
    </div>
  );
}