
import React from 'react';
import { cn } from '@/lib/utils';

interface AlbumDisplayProps {
  coverUrl: string;
  title: string;
  artist: string;
  album: string;
  isVisible: boolean;
}

const AlbumDisplay: React.FC<AlbumDisplayProps> = ({
  coverUrl,
  title,
  artist,
  album,
  isVisible
}) => {
  return (
    <div className={cn("flex items-center mb-8 transition-all duration-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
    )}>
      <img 
        src={coverUrl} 
        alt={album} 
        className="h-16 w-16 rounded-md object-cover shadow-lg" 
      />
      <div className="ml-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-white/80">{artist} • {album}</p>
      </div>
    </div>
  );
};

export default AlbumDisplay;
