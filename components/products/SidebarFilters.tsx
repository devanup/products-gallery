'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CategoryCount } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface SidebarFiltersProps {
  categories: CategoryCount[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  onClearAll: () => void;
  className?: string;
}

export function SidebarFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  minPrice,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
  onClearAll,
  className,
}: SidebarFiltersProps) {
  // Local state for immediate slider updates
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  // Update local state when props change (e.g., when filters are cleared)
  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  // Debounced effect to update actual filters
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only update if the local values are different from the current filter values
      if (localMinPrice !== minPrice || localMaxPrice !== maxPrice) {
        onPriceChange(localMinPrice, localMaxPrice);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timeoutId);
  }, [localMinPrice, localMaxPrice, minPrice, maxPrice, onPriceChange]);

  const hasActiveFilters =
    selectedCategory ||
    minPrice > priceRange.min ||
    maxPrice < priceRange.max ||
    minRating > 0;

  const handleSliderChange = (min: number, max: number) => {
    setLocalMinPrice(min);
    setLocalMaxPrice(max);
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange('')}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent',
                !selectedCategory && 'bg-accent font-medium'
              )}
            >
              <span>All</span>
              <span className="text-muted-foreground">
                {categories.reduce((sum, c) => sum + c.count, 0)}
              </span>
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent capitalize',
                  selectedCategory === category.name && 'bg-accent font-medium'
                )}
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <div className="px-2 pt-6 pb-2">
            <DualRangeSlider
              label={(value) => formatPrice(value)}
              labelPosition="top"
              value={[localMinPrice, localMaxPrice]}
              onValueChange={([min, max]) => handleSliderChange(min, max)}
              min={priceRange.min}
              max={priceRange.max}
              step={1}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <RadioGroup
            value={minRating.toString()}
            onValueChange={(value) => onRatingChange(Number(value))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="rating-0" />
              <Label htmlFor="rating-0" className="text-sm font-normal cursor-pointer">
                All Ratings
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="rating-3" />
              <Label htmlFor="rating-3" className="text-sm font-normal cursor-pointer">
                3+ Stars
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="rating-4" />
              <Label htmlFor="rating-4" className="text-sm font-normal cursor-pointer">
                4+ Stars
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
