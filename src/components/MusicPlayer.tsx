
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Repeat, Shuffle, Volume2, MoreHorizontal, 
  Heart
} from 'lucide-react';

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

  if (isMinimized) {
    return (
      <div className={cn("flex items-center bg-background/60 backdrop-blur-lg p-3 border-t", className)}>
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
            onClick={onPrev}
          >
            <SkipBack size={18} />
          </button>
          <button 
            className="media-button h-8 w-8"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button 
            className="media-button h-8 w-8"
            onClick={onNext}
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
    <div className={cn("flex flex-col relative w-full h-full", className)}>
      {/* Blurred background */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={song.coverUrl}
          alt={song.album}
          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
        />
        <div className="player-backdrop" />
        
        {/* Album art and controls */}
        <div className="relative z-10 flex flex-col h-full pt-8 px-6 pb-10">
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full animate-fade-in">
            <div className="relative aspect-square w-full max-w-xs rounded-md overflow-hidden shadow-2xl mb-8">
              <img
                src={song.coverUrl}
                alt={song.album}
                className="w-full h-full object-cover animate-scale-in"
              />
            </div>
            
            <div className="w-full text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight truncate">{song.title}</h2>
              <p className="text-base text-muted-foreground truncate">{song.artist}</p>
              <p className="text-sm text-muted-foreground/80 truncate">{song.album}</p>
            </div>
            
            {/* Time slider */}
            <div className="w-full mb-6">
              <Slider 
                defaultValue={[0]} 
                value={[currentTime]} 
                max={song.duration} 
                step={0.1} 
                onValueChange={onSeek}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(song.duration)}</span>
              </div>
            </div>
            
            {/* Playback controls */}
            <div className="flex items-center justify-between w-full mb-6">
              <button 
                className={cn("media-button h-10 w-10", 
                  isShuffle ? "text-primary" : "text-foreground")}
                onClick={toggleShuffle}
              >
                <Shuffle size={18} />
              </button>
              
              <button 
                className="media-button h-12 w-12"
                onClick={onPrev}
              >
                <SkipBack size={22} />
              </button>
              
              <button 
                className="media-button h-16 w-16 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={30} /> : <Play size={30} className="ml-1" />}
              </button>
              
              <button 
                className="media-button h-12 w-12"
                onClick={onNext}
              >
                <SkipForward size={22} />
              </button>
              
              <button 
                className={cn("media-button h-10 w-10", 
                  repeatMode > 0 ? "text-primary" : "text-foreground")}
                onClick={toggleRepeat}
              >
                <Repeat size={18} />
                {repeatMode === 2 && <span className="absolute text-[8px] font-bold">1</span>}
              </button>
            </div>
            
            {/* Volume control */}
            <div className="flex items-center w-full">
              <Volume2 size={18} className="mr-2 text-muted-foreground" />
              <Slider 
                defaultValue={[80]} 
                value={[volume]} 
                max={100} 
                step={1} 
                onValueChange={handleVolumeChange}
              />
            </div>
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
