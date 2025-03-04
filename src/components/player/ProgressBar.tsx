
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
    <div className={cn("w-full transition-all duration-500", 
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
    )}>
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
        className="mb-8"
      />
    </div>
  );
};

export default ProgressBar;
