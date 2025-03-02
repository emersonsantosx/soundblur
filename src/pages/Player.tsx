
import React from 'react';
import { useMusic } from '@/context/MusicContext';
import MusicPlayer from '@/components/MusicPlayer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Player = () => {
  const { currentSong, playNext, playPrevious } = useMusic();
  const navigate = useNavigate();
  
  if (!currentSong) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium mb-4">No song is currently playing</p>
          <button 
            className="text-primary hover:underline"
            onClick={() => navigate('/library')}
          >
            Choose a song from your library
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute top-0 left-0 z-20 p-4">
        <button 
          className="p-2 rounded-full bg-background/40 backdrop-blur-md hover:bg-background/60 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <MusicPlayer 
        song={currentSong}
        onNext={playNext}
        onPrev={playPrevious}
      />
    </div>
  );
};

export default Player;
