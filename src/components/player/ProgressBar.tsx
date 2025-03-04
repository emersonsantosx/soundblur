
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { formatTime } from '@/utils/formatTime';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (value: number[]) => void;
  isVisible: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  isVisible
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-white mb-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <Slider 
        defaultValue={[0]} 
        value={[currentTime]} 
        max={duration} 
        step={0.1} 
        onValueChange={onSeek}
      />
    </div>
  );
};

export default ProgressBar;
