
import React, { useState } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Library, 
  Compass, 
  Settings as SettingsIcon, 
  Music,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MusicPlayer from '@/components/MusicPlayer';
import { useMusic } from '@/context/MusicContext';
import SearchInput from '@/components/SearchInput';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentSong, playNext, playPrevious } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  
  const showMiniPlayer = currentSong && location.pathname !== '/player';
  const isPlayerPage = location.pathname === '/player';
  
  const handleMiniPlayerClick = () => {
    if (currentSong && !isPlayerPage) {
      navigate('/player');
    }
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      {!isPlayerPage && (
        <header className="h-16 border-b flex items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Groove Music</span>
          </Link>
          
          <div className="hidden md:block w-1/3">
            <SearchInput 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for songs, albums, or artists"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-secondary/50 md:hidden">
              <Search size={20} />
            </button>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-hidden relative",
        showMiniPlayer && "pb-16"
      )}>
        <Outlet />
      </main>
      
      {/* Mini Player */}
      {showMiniPlayer && currentSong && (
        <div 
          className="fixed bottom-[4.5rem] md:bottom-0 left-0 right-0 z-30 transition-transform duration-300 transform hover:translate-y-[-4px] cursor-pointer"
          onClick={handleMiniPlayerClick}
        >
          <MusicPlayer 
            song={currentSong}
            onNext={playNext}
            onPrev={playPrevious}
            isMinimized={true}
          />
        </div>
      )}
      
      {/* Bottom Navigation */}
      {!isPlayerPage && (
        <nav className="h-16 border-t flex items-center justify-around px-4 bg-background">
          <Link 
            to="/library"
            className={cn(
              "nav-item",
              location.pathname === '/library' && "active"
            )}
          >
            <Library size={24} />
            <span className="text-xs mt-1">Library</span>
          </Link>
          
          <Link 
            to="/explore"
            className={cn(
              "nav-item",
              location.pathname === '/explore' && "active"
            )}
          >
            <Compass size={24} />
            <span className="text-xs mt-1">Explore</span>
          </Link>
          
          <Link 
            to="/settings"
            className={cn(
              "nav-item",
              location.pathname === '/settings' && "active"
            )}
          >
            <SettingsIcon size={24} />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Layout;
