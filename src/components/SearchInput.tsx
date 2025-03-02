
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Search...", className }: SearchInputProps) => {
  return (
    <div className={cn(
      "relative w-full",
      className
    )}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full pl-9 pr-4 rounded-md bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/20"
      />
    </div>
  );
};

export default SearchInput;
