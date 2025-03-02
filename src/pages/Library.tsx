
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMusic } from '@/context/MusicContext';
import AlbumCard from '@/components/AlbumCard';
import TrackItem from '@/components/TrackItem';
import SearchInput from '@/components/SearchInput';
import { cn } from '@/lib/utils';

const Library = () => {
  const { 
    albums, 
    artists, 
    allSongs, 
    currentSong, 
    playAlbum, 
    playSong,
    playArtist
  } = useMusic();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter data based on search query
  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSongs = allSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) || 
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Library</h1>
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for music..."
            className="w-64"
          />
        </div>
        
        <Tabs defaultValue="albums" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
          </TabsList>
          
          {/* Albums Tab */}
          <TabsContent value="albums" className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20">
              {filteredAlbums.map(album => (
                <AlbumCard 
                  key={album.id}
                  id={album.id}
                  title={album.title}
                  artist={album.artist}
                  coverUrl={album.coverUrl}
                  onPlay={() => playAlbum(album.id)}
                />
              ))}
              
              {filteredAlbums.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No albums found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Artists Tab */}
          <TabsContent value="artists" className="animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20">
              {filteredArtists.map(artist => (
                <div 
                  key={artist.id}
                  className="album-card group relative flex flex-col transition-all duration-300"
                  onClick={() => playArtist(artist.id)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-full">
                    <img 
                      src={artist.imageUrl} 
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                  </div>
                  
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-sm">{artist.name}</h3>
                    <p className="text-xs text-muted-foreground">{artist.albums.length} Albums</p>
                  </div>
                </div>
              ))}
              
              {filteredArtists.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No artists found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Songs Tab */}
          <TabsContent value="songs" className="animate-fade-in">
            <div className="flex flex-col space-y-1 pb-20">
              {filteredSongs.map(song => (
                <TrackItem 
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  album={song.album}
                  duration={song.duration}
                  coverUrl={song.coverUrl}
                  isPlaying={currentSong?.id === song.id}
                  onPlay={() => playSong(song)}
                />
              ))}
              
              {filteredSongs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No songs found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Library;
