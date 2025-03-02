
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import ThemeToggle from '@/components/ThemeToggle';

const Settings = () => {
  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Appearance</h2>
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Theme</h3>
                  <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <ThemeToggle />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Show Album Art in Background</h3>
                  <p className="text-sm text-muted-foreground">Display album art as player background</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Animations</h3>
                  <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          {/* Playback Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Playback</h2>
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Gapless Playback</h3>
                  <p className="text-sm text-muted-foreground">Eliminate silence between consecutive tracks</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Crossfade</h3>
                  <p className="text-sm text-muted-foreground">Blend the end of one song into the beginning of another</p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <div>
                  <h3 className="text-base font-medium">Crossfade Duration</h3>
                  <p className="text-sm text-muted-foreground">Time to fade between songs (in seconds)</p>
                </div>
                <Slider defaultValue={[3]} min={1} max={12} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1s</span>
                  <span>6s</span>
                  <span>12s</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Audio Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Audio</h2>
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Equalizer</h3>
                  <p className="text-sm text-muted-foreground">Customize audio frequency balance</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Normalize Volume</h3>
                  <p className="text-sm text-muted-foreground">Keep volume consistent between songs</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <div>
                  <h3 className="text-base font-medium">Audio Quality</h3>
                  <p className="text-sm text-muted-foreground">Set default audio streaming quality</p>
                </div>
                <select className="w-full p-2 bg-background border rounded-md">
                  <option value="auto">Automatic</option>
                  <option value="high">High (320 kbps)</option>
                  <option value="medium">Medium (160 kbps)</option>
                  <option value="low">Low (96 kbps)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About</h2>
            <Separator />
            
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium">Version</h3>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>
              
              <div>
                <h3 className="text-base font-medium">Storage</h3>
                <p className="text-sm text-muted-foreground">Used: 1.2 GB / Free: 32 GB</p>
              </div>
              
              <div className="pt-2">
                <button className="text-sm text-primary">Clear Cache</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
