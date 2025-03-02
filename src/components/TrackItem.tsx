
import React from 'react';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackItemProps {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  coverUrl: string;
  isPlaying?: boolean;
  onPlay: () => void;
  className?: string;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const TrackItem = ({ 
  id, 
  title, 
  artist, 
  album, 
  duration, 
  coverUrl, 
  isPlaying = false, 
  onPlay,
  className 
}: TrackItemProps) => {
  return (
    <div 
      className={cn(
        "track-item group",
        isPlaying ? "bg-primary/10" : "",
        className
      )}
    >
      <div className="relative h-10 w-10 mr-3 flex-shrink-0">
        <img 
          src={coverUrl} 
          alt={title}
          className="h-full w-full object-cover rounded-md"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={onPlay}
            className="text-white"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-w-0 mr-3">
        <p className={cn(
          "text-sm font-medium truncate",
          isPlaying ? "text-primary" : "text-foreground"
        )}>
          {title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {artist}{album ? ` • ${album}` : ''}
        </p>
      </div>
      
      <div className="text-xs text-muted-foreground whitespace-nowrap">
        {formatDuration(duration)}
      </div>
      
      <button className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};

export default TrackItem;
