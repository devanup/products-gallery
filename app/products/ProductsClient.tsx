'use client';

import { useState, useMemo } from 'react';
import { useProductsQuery } from '@/hooks/useProductsQuery';
import { useFilterState } from '@/hooks/useFilterState';
import { applyFilters, getCategoryCounts, getPriceRange } from '@/lib/filters';
import { ControlsBar } from '@/components/products/ControlsBar';
import { SidebarFilters } from '@/components/products/SidebarFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SkeletonGrid } from '@/components/products/SkeletonCard';
import { ErrorState } from '@/components/products/ErrorState';
import { EmptyState } from '@/components/products/EmptyState';
import { LoadMore } from '@/components/products/LoadMore';
import { Drawer } from '@/components/products/Drawer';
import { cn } from '@/lib/utils';

export function ProductsClient() {
  const { data: products, isLoading, error, refetch } = useProductsQuery();
  const { filters, take, updateFilters, updateTake, clearFilters } = useFilterState();
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return applyFilters(products, filters);
  }, [products, filters]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, take);
  }, [filteredProducts, take]);

  const categoryCounts = useMemo(() => {
    if (!products) return [];
    return getCategoryCounts(products);
  }, [products]);

  const priceRange = useMemo(() => {
    if (!products) return { min: 0, max: 1000 };
    return getPriceRange(products);
  }, [products]);

  const handleLoadMore = () => {
    updateTake(take + 9);
  };

  const hasMore = displayedProducts.length < filteredProducts.length;

  if (error) {
    return <ErrorState error={error as Error} onRetry={() => refetch()} />;
  }

  const filtersSidebar = (
    <SidebarFilters
      categories={categoryCounts}
      selectedCategory={filters.category}
      onCategoryChange={(category) =>
        updateFilters({ category: category === filters.category ? '' : category })
      }
      priceRange={priceRange}
      minPrice={filters.minPrice || priceRange.min}
      maxPrice={filters.maxPrice || priceRange.max}
      onPriceChange={(min, max) => updateFilters({ minPrice: min, maxPrice: max })}
      minRating={filters.minRating}
      onRatingChange={(rating) => updateFilters({ minRating: rating })}
      onClearAll={clearFilters}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">Products</h1>
        <ControlsBar
          onToggleFilters={() => {
            if (window.innerWidth < 1024) {
              setIsDrawerOpen(true);
            } else {
              setIsFilterExpanded(!isFilterExpanded);
            }
          }}
          search={filters.search}
          onSearchChange={(search) => updateFilters({ search })}
          sort={filters.sort}
          onSortChange={(sort) => updateFilters({ sort })}
          isFilterExpanded={isFilterExpanded}
        />
      </div>

      <div className="flex gap-8">
        <aside
          className={cn(
            'hidden lg:block transition-all duration-300',
            isFilterExpanded ? 'w-64' : 'w-0 overflow-hidden'
          )}
        >
          {isFilterExpanded && filtersSidebar}
        </aside>

        <main className="flex-1 min-w-0">
          {isLoading ? (
            <SkeletonGrid />
          ) : displayedProducts.length === 0 ? (
            <EmptyState message="Try adjusting your filters to see more results." />
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground text-center">
                Showing {displayedProducts.length} out of {filteredProducts.length} items
              </div>
              <ProductGrid products={displayedProducts} />
              <LoadMore onClick={handleLoadMore} hasMore={hasMore} />
            </>
          )}
        </main>
      </div>

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {filtersSidebar}
      </Drawer>
    </div>
  );
}
