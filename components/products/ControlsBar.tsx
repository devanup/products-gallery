'use client';

import { SlidersHorizontal, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOption } from '@/lib/types';
import { useState, useEffect, useRef } from 'react';

interface ControlsBarProps {
  onToggleFilters: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  isFilterExpanded: boolean;
}

export function ControlsBar({
  onToggleFilters,
  search,
  onSearchChange,
  sort,
  onSortChange,
  isFilterExpanded,
}: ControlsBarProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="default"
          onClick={onToggleFilters}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isFilterExpanded ? 'Hide' : 'Show'} Filters
          </span>
          <span className="sm:hidden">Filters</span>
        </Button>

        <div className="relative flex-1 sm:w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
            aria-label="Search products"
          />
        </div>
      </div>

      <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Default</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating-desc">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
