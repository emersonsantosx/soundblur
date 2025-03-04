
import React from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface MiniPlayerProps {
  song: {
    coverUrl: string;
    album: string;
    title: string;
    artist: string;
    audioUrl: string;
  };
  isPlaying: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
  onMiniPlayerClick: () => void;
  className?: string;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  song,
  isPlaying,
  onNext,
  onPrev,
  onPlayPause,
  onMiniPlayerClick,
  className
}) => {
  return (
    <div 
      className={cn(
        "flex items-center bg-background/60 backdrop-blur-lg p-3 border-t cursor-pointer transition-all duration-300 hover:bg-background/80", 
        className
      )}
      onClick={onMiniPlayerClick}
    >
      <img 
        src={song.coverUrl} 
        alt={song.album} 
        className="h-10 w-10 rounded-md object-cover" 
      />
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{song.title}</p>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>
      <div className="flex space-x-2">
        <button 
          className="media-button h-8 w-8"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <SkipBack size={18} />
        </button>
        <button 
          className="media-button h-8 w-8"
          onClick={(e) => { e.stopPropagation(); onPlayPause(); }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button 
          className="media-button h-8 w-8"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
