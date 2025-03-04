
import React from 'react';
import { cn } from '@/lib/utils';

interface AlbumDisplayProps {
  coverUrl: string;
  title: string;
  artist: string;
  album: string;
  isVisible: boolean;
  isExpanded: boolean;
}

const AlbumDisplay: React.FC<AlbumDisplayProps> = ({
  coverUrl,
  title,
  artist,
  album,
  isVisible,
  isExpanded
}) => {
  return (
    <div 
      className={cn(
        "flex items-center transition-all duration-500",
        isExpanded 
          ? "mb-8 translate-y-0" 
          : "mb-0 translate-y-40", // Isso fará com que deslize para baixo quando os controles estiverem ocultos
        isVisible 
          ? "opacity-100" 
          : "opacity-0"
      )}
    >
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
