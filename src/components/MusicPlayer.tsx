
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Song } from '@/types/music';
import AlbumDisplay from './player/AlbumDisplay';
import ProgressBar from './player/ProgressBar';
import PlayerControls from './player/PlayerControls';
import MiniPlayer from './player/MiniPlayer';

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
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
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
      <MiniPlayer
        song={song}
        isPlaying={isPlaying}
        onNext={onNext}
        onPrev={onPrev}
        onPlayPause={togglePlayPause}
        onMiniPlayerClick={handleMiniPlayerClick}
        className={className}
      />
    );
  }

  return (
    <div 
      className={cn("relative w-full h-full", className)}
      onClick={toggleControlsVisibility}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={song.coverUrl}
          alt={song.album}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full justify-between px-4 py-6">
        <div></div>

        <div className="mt-auto">
          <AlbumDisplay
            coverUrl={song.coverUrl}
            title={song.title}
            artist={song.artist}
            album={song.album}
            isVisible={true} // Always keep it visible
            isExpanded={isControlsVisible} // Control position with isExpanded prop
          />

          {isControlsVisible && (
            <>
              <ProgressBar
                currentTime={currentTime}
                duration={song.duration}
                onSeek={onSeek}
                isVisible={true}
              />
              
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={togglePlayPause}
                onNext={onNext}
                onPrev={onPrev}
                onToggleRepeat={toggleRepeat}
                onToggleShuffle={toggleShuffle}
                isVisible={true}
              />
            </>
          )}
        </div>
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
};

export default MusicPlayer;
