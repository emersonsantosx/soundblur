
import { useState, useMemo } from 'react';
import { Song, Album, Artist } from '@/types/musicContext';
import { mockSongs, mockAlbums, mockArtists } from '@/data/mockMusic';

export const useMusicPlayer = () => {
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

  return {
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
};
