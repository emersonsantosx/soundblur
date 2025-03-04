
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Play, Pause, SkipBack, SkipForward, 
  RefreshCw, Shuffle, MoreHorizontal
} from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
  isVisible: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onToggleRepeat,
  onToggleShuffle,
  isVisible
}) => {
  return (
    <div className={cn("flex items-center justify-between w-full transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
    )}>
      <button className="media-button text-white p-2" onClick={onPrev}>
        <SkipBack size={24} />
      </button>
      
      <button 
        className="media-button text-white p-2"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>
      
      <button className="media-button text-white p-2" onClick={onNext}>
        <SkipForward size={24} />
      </button>
      
      <button className="media-button text-white p-2" onClick={onToggleRepeat}>
        <RefreshCw size={22} />
      </button>
      
      <button className="media-button text-white p-2" onClick={onToggleShuffle}>
        <Shuffle size={22} />
      </button>
      
      <button className="media-button text-white p-2">
        <MoreHorizontal size={22} />
      </button>
    </div>
  );
};

export default PlayerControls;
