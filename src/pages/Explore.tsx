
import React, { useState } from 'react';
import { useMusic } from '@/context/MusicContext';
import AlbumCard from '@/components/AlbumCard';
import SearchInput from '@/components/SearchInput';
import { Separator } from '@/components/ui/separator';

const Explore = () => {
  const { albums, playAlbum } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter data based on search query
  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group albums by year (newest first)
  const albumsByYear = filteredAlbums.reduce((acc, album) => {
    if (!acc[album.year]) {
      acc[album.year] = [];
    }
    acc[album.year].push(album);
    return acc;
  }, {} as Record<number, typeof albums>);
  
  const years = Object.keys(albumsByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Explore Music</h1>
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Find new music..."
            className="w-64"
          />
        </div>
        
        <div className="pb-20">
          {/* Featured Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Featured Albums</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAlbums.slice(0, 4).map(album => (
                <AlbumCard 
                  key={album.id}
                  id={album.id}
                  title={album.title}
                  artist={album.artist}
                  coverUrl={album.coverUrl}
                  onPlay={() => playAlbum(album.id)}
                  className="w-full"
                />
              ))}
            </div>
          </div>
          
          <Separator className="my-8" />
          
          {/* Albums by Year */}
          <div className="space-y-8">
            {years.map(year => (
              <div key={year}>
                <h2 className="text-lg font-medium mb-4">{year}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {albumsByYear[year].map(album => (
                    <AlbumCard 
                      key={album.id}
                      id={album.id}
                      title={album.title}
                      artist={album.artist}
                      coverUrl={album.coverUrl}
                      onPlay={() => playAlbum(album.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
            
            {years.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No albums found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
