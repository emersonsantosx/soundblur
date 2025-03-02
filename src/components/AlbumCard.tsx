
import React from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  onPlay: () => void;
  className?: string;
}

const AlbumCard = ({ id, title, artist, coverUrl, onPlay, className }: AlbumCardProps) => {
  return (
    <div 
      className={cn(
        "album-card group relative flex flex-col transition-all duration-300",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={coverUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            onClick={onPlay}
            className="bg-primary text-primary-foreground rounded-full p-2 transform scale-90 hover:scale-100 transition-all duration-300"
          >
            <Play size={24} className="ml-1" />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        <p className="text-xs text-muted-foreground truncate">{artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
