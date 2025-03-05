
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMusic } from '@/context/MusicContext';
import { ChevronLeft } from 'lucide-react';
import AlbumCard from '@/components/AlbumCard';

const Artist = () => {
  const { artistId } = useParams();
  const { artists, playArtist, playAlbum } = useMusic();
  const navigate = useNavigate();
  
  const artist = artists.find(a => a.name === artistId);
  
  if (!artist) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium mb-4">Artist not found</p>
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
          src={artist.imageUrl} 
          alt={artist.name}
          className="w-48 h-48 object-cover rounded-full shadow-lg" 
        />
        
        <div>
          <h1 className="text-2xl font-bold">{artist.name}</h1>
          <p className="mt-1">{artist.albums.length} albums</p>
          
          <button
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
            onClick={() => playArtist(artist.id)}
          >
            Play All
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {artist.albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              artist={album.artist}
              coverUrl={album.coverUrl}
              onPlay={() => playAlbum(album.id)}
              className=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
