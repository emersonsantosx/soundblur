
import React, { useEffect } from 'react';
import { useMusic } from '@/context/MusicContext';
import MusicPlayer from '@/components/MusicPlayer';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Player = () => {
  const { currentSong, playNext, playPrevious } = useMusic();
  const navigate = useNavigate();
  
  // Animate the entrance when component mounts
  useEffect(() => {
    document.getElementById('player-container')?.classList.add('animate-slide-up');
  }, []);
  
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
  
  const handleBack = () => {
    // Add exit animation before navigating back
    const container = document.getElementById('player-container');
    container?.classList.remove('animate-slide-up');
    container?.classList.add('animate-slide-down');
    
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate(-1);
    }, 200);
  };
  
  return (
    <div id="player-container" className="relative h-full w-full overflow-hidden transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <button 
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          onClick={handleBack}
        >
          <ChevronDown size={24} />
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
