
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "@/context/MusicContext";

import Layout from "@/components/Layout";
import Library from "@/pages/Library";
import Explore from "@/pages/Explore";
import Player from "@/pages/Player";
import Settings from "@/pages/Settings";
import Album from "@/pages/Album";
import Artist from "@/pages/Artist";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MusicProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Library />} />
              <Route path="/library" element={<Library />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/player" element={<Player />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/album/:albumId" element={<Album />} />
              <Route path="/artist/:artistId" element={<Artist />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
