
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  Play, Pause, SkipBack, SkipForward, 
  RefreshCw, Shuffle, MoreHorizontal
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
  const [isControlsVisible, setIsControlsVisible] = useState(true);

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

  const toggleControlsVisibility = () => {
    setIsControlsVisible(!isControlsVisible);
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
    <div 
      className={cn("relative w-full h-full", className)}
      onClick={toggleControlsVisibility}
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={song.coverUrl}
          alt={song.album}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between px-4 py-6">
        {/* Empty space at top */}
        <div></div>

        {/* Controls at bottom with album info positioned just above them */}
        <div className="mt-auto">
          {/* Album info - always visible, positioned above the controls */}
          <div className="flex items-center mb-8">
            <img 
              src={song.coverUrl} 
              alt={song.album} 
              className="h-16 w-16 rounded-md object-cover shadow-lg" 
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-white">{song.title}</h2>
              <p className="text-white/80">{song.artist}</p>
            </div>
          </div>

          {/* Time slider and timestamps with new design */}
          <div className={cn("w-full transition-all duration-500", 
            isControlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          )}>
            <div className="flex justify-between text-xs text-white mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
            <Slider 
              defaultValue={[0]} 
              value={[currentTime]} 
              max={song.duration} 
              step={0.1} 
              onValueChange={onSeek}
              className="mb-8"
            />
            
            {/* Playback controls matching the reference image */}
            <div className="flex items-center justify-between w-full">
              <button className="media-button text-white p-2">
                <SkipBack size={24} onClick={onPrev} />
              </button>
              
              <button 
                className="media-button text-white p-2"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              
              <button className="media-button text-white p-2">
                <SkipForward size={24} onClick={onNext} />
              </button>
              
              <button className="media-button text-white p-2">
                <RefreshCw size={22} onClick={toggleRepeat} />
              </button>
              
              <button className="media-button text-white p-2">
                <Shuffle size={22} onClick={toggleShuffle} />
              </button>
              
              <button className="media-button text-white p-2">
                <MoreHorizontal size={22} />
              </button>
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
