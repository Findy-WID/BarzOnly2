export default function SongsCard({song, onSelect}) {
    return (
        <div 
            className="bg-black rounded-lg cursor-pointer overflow-hidden"
            onClick={onSelect}
        >
            <img 
               src={song.songImage}
               alt={song.songTitle}
               className="w-full h-40 object-cover rounded-md"
            />
            <div className="p-4 text-white text center">
                <h2>{song.songTitle}</h2>
                <p>{song.artistName}</p>
            </div>
        </div>
    )
}