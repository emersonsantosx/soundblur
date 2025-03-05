
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

export interface MusicContextProps {
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
