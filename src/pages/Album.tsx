
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMusic } from '@/context/MusicContext';
import { ChevronLeft } from 'lucide-react';
import TrackItem from '@/components/TrackItem';

const Album = () => {
  const { albumId } = useParams();
  const { albums, playAlbum } = useMusic();
  const navigate = useNavigate();
  
  const album = albums.find(a => a.title === albumId);
  
  if (!album) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium mb-4">Album not found</p>
          <button 
            className="text-primary hover:underline"
            onClick={() => navigate('/library')}
          >
            Return to your library
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-screen-md mx-auto py-8 px-4">
      <button 
        className="flex items-center text-sm mb-6 hover:text-primary transition-colors"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} className="mr-1" />
        Back
      </button>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img 
          src={album.coverUrl} 
          alt={album.title}
          className="w-48 h-48 object-cover rounded-md shadow-lg" 
        />
        
        <div>
          <h1 className="text-2xl font-bold">{album.title}</h1>
          <p 
            className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
            onClick={() => navigate(`/artist/${album.artist}`)}
          >
            {album.artist}
          </p>
          <p className="text-muted-foreground mt-1">{album.year}</p>
          <p className="mt-1">{album.songs.length} songs</p>
          
          <button
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
            onClick={() => playAlbum(album.id)}
          >
            Play
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Songs</h2>
        <div className="space-y-2">
          {album.songs.map((song) => (
            <TrackItem
              key={song.id}
              song={song}
              onClick={() => playAlbum(album.id, song.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Album;
