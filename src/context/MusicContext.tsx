
import React, { createContext, useContext, ReactNode } from 'react';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { MusicContextProps, Song } from '@/types/musicContext';

// Create the context
const MusicContext = createContext<MusicContextProps | undefined>(undefined);

// Create the provider
interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const musicPlayerState = useMusicPlayer();
  
  return (
    <MusicContext.Provider value={musicPlayerState}>
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook to use the music context
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

// Re-export types from types file for backward compatibility
export type { Song } from '@/types/musicContext';
export type { Album } from '@/types/musicContext';
export type { Artist } from '@/types/musicContext';
