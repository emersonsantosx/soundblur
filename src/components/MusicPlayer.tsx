
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Repeat, Shuffle, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

interface MusicPlayerProps {
  song: Song;
  onNext: () => void;
  onPrev: () => void;
  isMinimized?: boolean;
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  onNext,
  onPrev,
  isMinimized = false,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one
  const [isLiked, setIsLiked] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset player state when song changes
    setCurrentTime(0);
    if (isPlaying) {
      audioRef.current?.play();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [song.id]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      audioRef.current?.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const onSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleEnded = () => {
    if (repeatMode === 2) {
      // Repeat one
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      // Go to next song
      onNext();
    }
  };

  const handleMiniPlayerClick = () => {
    if (isMinimized) {
      navigate('/player');
    }
  };

  if (isMinimized) {
    return (
      <div 
        className={cn(
          "flex items-center bg-background/60 backdrop-blur-lg p-3 border-t cursor-pointer transition-all duration-300 hover:bg-background/80", 
          className
        )}
        onClick={handleMiniPlayerClick}
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
            onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
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
        
        <audio
          ref={audioRef}
          src={song.audioUrl}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col relative w-full h-full bg-black", className)}>
      {/* Full-screen background image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={song.coverUrl}
          alt={song.album}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between px-4 py-6">
        {/* Song info at bottom */}
        <div className="mt-auto">
          <div className="flex items-center mb-6">
            <img 
              src={song.coverUrl} 
              alt={song.album} 
              className="h-16 w-16 rounded-md object-cover shadow-lg" 
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-white">{song.title}</h2>
              <p className="text-white/80">{song.artist} • {song.album}</p>
            </div>
          </div>
          
          {/* Time slider */}
          <div className="w-full mb-2">
            <Slider 
              defaultValue={[0]} 
              value={[currentTime]} 
              max={song.duration} 
              step={0.1} 
              onValueChange={onSeek}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
          </div>
          
          {/* Playback controls */}
          <div className="flex items-center justify-between w-full mt-6 mb-2">
            <button 
              className={cn("media-button h-12 w-12 text-white", 
                isShuffle ? "text-primary" : "text-white/80")}
              onClick={toggleShuffle}
            >
              <Shuffle size={22} />
            </button>
            
            <button 
              className="media-button h-14 w-14 text-white/90"
              onClick={onPrev}
            >
              <SkipBack size={28} />
            </button>
            
            <button 
              className="media-button h-16 w-16 bg-white text-black hover:bg-white/90 rounded-full flex items-center justify-center"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
            
            <button 
              className="media-button h-14 w-14 text-white/90"
              onClick={onNext}
            >
              <SkipForward size={28} />
            </button>
            
            <button 
              className={cn("media-button h-12 w-12", 
                repeatMode > 0 ? "text-primary" : "text-white/80")}
              onClick={toggleRepeat}
            >
              <Repeat size={22} />
              {repeatMode === 2 && <span className="absolute text-[8px] font-bold">1</span>}
            </button>
          </div>
          
          <div className="flex justify-center mt-4">
            <button 
              className={cn("media-button h-10 w-10", 
                isLiked ? "text-primary" : "text-white/80")}
              onClick={toggleLike}
            >
              <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default MusicPlayer;
