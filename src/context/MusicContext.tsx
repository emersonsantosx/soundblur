
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Define the types
export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  songs: Song[];
};

export type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  albums: Album[];
};

interface MusicContextProps {
  currentSong: Song | null;
  queue: Song[];
  playingFrom: 'album' | 'playlist' | 'artist' | 'all' | null;
  playingFromId: string | null;
  isPlaying: boolean;
  albums: Album[];
  artists: Artist[];
  allSongs: Song[];
  playSong: (song: Song) => void;
  playAlbum: (albumId: string, startSongId?: string) => void;
  playArtist: (artistId: string) => void;
  playAll: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlayPause: () => void;
}

// Create the context
const MusicContext = createContext<MusicContextProps | undefined>(undefined);

// Mock data
const mockSongs: Song[] = [
  {
    id: 's1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    coverUrl: 'https://images.unsplash.com/photo-1629276301820-e9b3bf5539b2?q=80&w=2070&auto=format&fit=crop',
    audioUrl: 'https://example.com/bohemian-rhapsody.mp3',
    duration: 354,
  },
  {
    id: 's2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    coverUrl: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?q=80&w=2070&auto=format&fit=crop',
    audioUrl: 'https://example.com/hotel-california.mp3',
    duration: 390,
  },
  {
    id: 's3',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    coverUrl: 'https://images.unsplash.com/photo-1502773860571-211a597d6e4b?q=80&w=2070&auto=format&fit=crop',
    audioUrl: 'https://example.com/stairway-to-heaven.mp3',
    duration: 482,
  },
  {
    id: 's4',
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    album: 'Appetite for Destruction',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop',
    audioUrl: 'https://example.com/sweet-child-o-mine.mp3',
    duration: 355,
  },
  {
    id: 's5',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    coverUrl: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?q=80&w=2070&auto=format&fit=crop',
    audioUrl: 'https://example.com/billie-jean.mp3',
    duration: 290,
  },
  {
    id: 's6',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    coverUrl: 'https://images.unsplash.com/photo-1536849460588-696219a9e98d?q=80&w=2071&auto=format&fit=crop',
    audioUrl: 'https://example.com/smells-like-teen-spirit.mp3',
    duration: 301,
  },
  {
    id: 's7',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    coverUrl: 'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?q=80&w=2072&auto=format&fit=crop',
    audioUrl: 'https://example.com/imagine.mp3',
    duration: 183,
  },
  {
    id: 's8',
    title: 'Every Breath You Take',
    artist: 'The Police',
    album: 'Synchronicity',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
    audioUrl: 'https://example.com/every-breath-you-take.mp3',
    duration: 253,
  }
];

const mockAlbums: Album[] = [
  {
    id: 'a1',
    title: 'A Night at the Opera',
    artist: 'Queen',
    coverUrl: 'https://images.unsplash.com/photo-1629276301820-e9b3bf5539b2?q=80&w=2070&auto=format&fit=crop',
    year: 1975,
    songs: [mockSongs[0]],
  },
  {
    id: 'a2',
    title: 'Hotel California',
    artist: 'Eagles',
    coverUrl: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?q=80&w=2070&auto=format&fit=crop',
    year: 1976,
    songs: [mockSongs[1]],
  },
  {
    id: 'a3',
    title: 'Led Zeppelin IV',
    artist: 'Led Zeppelin',
    coverUrl: 'https://images.unsplash.com/photo-1502773860571-211a597d6e4b?q=80&w=2070&auto=format&fit=crop',
    year: 1971,
    songs: [mockSongs[2]],
  },
  {
    id: 'a4',
    title: 'Appetite for Destruction',
    artist: 'Guns N\' Roses',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop',
    year: 1987,
    songs: [mockSongs[3]],
  },
  {
    id: 'a5',
    title: 'Thriller',
    artist: 'Michael Jackson',
    coverUrl: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?q=80&w=2070&auto=format&fit=crop',
    year: 1982,
    songs: [mockSongs[4]],
  },
  {
    id: 'a6',
    title: 'Nevermind',
    artist: 'Nirvana',
    coverUrl: 'https://images.unsplash.com/photo-1536849460588-696219a9e98d?q=80&w=2071&auto=format&fit=crop',
    year: 1991,
    songs: [mockSongs[5]],
  },
  {
    id: 'a7',
    title: 'Imagine',
    artist: 'John Lennon',
    coverUrl: 'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?q=80&w=2072&auto=format&fit=crop',
    year: 1971,
    songs: [mockSongs[6]],
  },
  {
    id: 'a8',
    title: 'Synchronicity',
    artist: 'The Police',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
    year: 1983,
    songs: [mockSongs[7]],
  },
];

const mockArtists: Artist[] = [
  {
    id: 'art1',
    name: 'Queen',
    imageUrl: 'https://images.unsplash.com/photo-1629276301820-e9b3bf5539b2?q=80&w=2070&auto=format&fit=crop',
    albums: [mockAlbums[0]],
  },
  {
    id: 'art2',
    name: 'Eagles',
    imageUrl: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?q=80&w=2070&auto=format&fit=crop',
    albums: [mockAlbums[1]],
  },
  {
    id: 'art3',
    name: 'Led Zeppelin',
    imageUrl: 'https://images.unsplash.com/photo-1502773860571-211a597d6e4b?q=80&w=2070&auto=format&fit=crop',
    albums: [mockAlbums[2]],
  },
  {
    id: 'art4',
    name: 'Guns N\' Roses',
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop',
    albums: [mockAlbums[3]],
  },
  {
    id: 'art5',
    name: 'Michael Jackson',
    imageUrl: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?q=80&w=2070&auto=format&fit=crop',
    albums: [mockAlbums[4]],
  },
  {
    id: 'art6',
    name: 'Nirvana',
    imageUrl: 'https://images.unsplash.com/photo-1536849460588-696219a9e98d?q=80&w=2071&auto=format&fit=crop',
    albums: [mockAlbums[5]],
  },
  {
    id: 'art7',
    name: 'John Lennon',
    imageUrl: 'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?q=80&w=2072&auto=format&fit=crop',
    albums: [mockAlbums[6]],
  },
  {
    id: 'art8',
    name: 'The Police',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop',
    albums: [mockAlbums[7]],
  },
];

// Create the provider
interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingFrom, setPlayingFrom] = useState<'album' | 'playlist' | 'artist' | 'all' | null>(null);
  const [playingFromId, setPlayingFromId] = useState<string | null>(null);

  // All data
  const allSongs = useMemo(() => mockSongs, []);
  const albums = useMemo(() => mockAlbums, []);
  const artists = useMemo(() => mockArtists, []);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playAlbum = (albumId: string, startSongId?: string) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;
    
    setQueue(album.songs);
    setPlayingFrom('album');
    setPlayingFromId(albumId);
    
    if (startSongId) {
      const songIndex = album.songs.findIndex(s => s.id === startSongId);
      if (songIndex !== -1) {
        setCurrentSong(album.songs[songIndex]);
      } else {
        setCurrentSong(album.songs[0]);
      }
    } else {
      setCurrentSong(album.songs[0]);
    }
    
    setIsPlaying(true);
  };

  const playArtist = (artistId: string) => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return;
    
    const allArtistSongs = artist.albums.flatMap(album => album.songs);
    setQueue(allArtistSongs);
    setPlayingFrom('artist');
    setPlayingFromId(artistId);
    setCurrentSong(allArtistSongs[0]);
    setIsPlaying(true);
  };

  const playAll = () => {
    setQueue(allSongs);
    setPlayingFrom('all');
    setPlayingFromId(null);
    setCurrentSong(allSongs[0]);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const resumeSong = () => {
    if (currentSong) {
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (!currentSong || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(song => song.id === currentSong.id);
    if (currentIndex === -1 || currentIndex === queue.length - 1) {
      // If at the end, loop back to the first song
      setCurrentSong(queue[0]);
    } else {
      setCurrentSong(queue[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    if (!currentSong || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(song => song.id === currentSong.id);
    if (currentIndex === -1 || currentIndex === 0) {
      // If at the beginning, loop to the last song
      setCurrentSong(queue[queue.length - 1]);
    } else {
      setCurrentSong(queue[currentIndex - 1]);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const value = {
    currentSong,
    queue,
    playingFrom,
    playingFromId,
    isPlaying,
    albums,
    artists,
    allSongs,
    playSong,
    playAlbum,
    playArtist,
    playAll,
    pauseSong,
    resumeSong,
    playNext,
    playPrevious,
    togglePlayPause
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

// Custom hook to use the music context
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
